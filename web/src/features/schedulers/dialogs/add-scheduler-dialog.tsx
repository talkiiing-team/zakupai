import { FC, Ref, useEffect, useState } from "react";
import { Button, Dialog, Loader, SegmentedRadioGroup, Select, Text, TextInput } from "@gravity-ui/uikit";
import { Cron } from 'react-js-cron'

import { useDashboards } from '@/features/dashboards/hooks/use-dashboards';
import { useNotificationChannels } from '@/features/notification-channels/hooks/use-notification-channels';
import { extractDashboardName } from '@/features/dashboards/utils';
import { At, PaperPlane } from '@gravity-ui/icons';

import 'react-js-cron/dist/styles.css'
import { useCreateScheduler } from '../hooks/use-create-scheduler';
import { toaster } from '@/shared/lib/toaster';

type Props = {
    target?: string,
    open: boolean,
    onClose: () => void,
    onApply: () => void,
};

export interface NotificationChannelNameProps {
  type: 'telegram' | 'email',
  name: string
}

const NotificationChannelName: FC<NotificationChannelNameProps> = ({ type, name }) => {
  return (
    <div className='flex items-center gap-2'>
      {type === 'telegram' && <PaperPlane />}
      {type === 'email' && <At />}
      <span>
        {name}
      </span>
    </div>
  )
}

export function AddSchedulerDialog({ open, onClose, target }: Props) {
    const [formValue, setFormValue] = useState<
        {
          cron: string,
          notificationChannelIds: number[],
          dashboard?: string
        }
    >({
      cron: '0 0 * * *',
      notificationChannelIds: []
    });

    const { data: dashboards, isSuccess: isDashboardsSuccess } = useDashboards()
    const { data: notificationChannels, isSuccess: isNotificationChannelsSuccess } = useNotificationChannels()

    const createMutation = useCreateScheduler()

    useEffect(() => {
        if (createMutation.isSuccess) {
          toaster.add({
            name: 'asdadфыв',
            autoHiding: 1500,
            title: 'Создано'
          })
          onClose()
          setFormValue(
            {
              cron: '0 0 * * *',
              notificationChannelIds: []
            }
          )
        }
      }, [createMutation.isSuccess])

    const onCancel = () => {
        onClose();
    };

    const onApply = () => {
      createMutation.mutate({
        notificationChannelIds: formValue.notificationChannelIds,
        target: target ?? `https://datalens.xn----7sbbznd9a5a.xn--p1ai/${formValue.dashboard!}?mode=embedded`,
        cron: formValue.cron
      })
    };

    return (
        <Dialog
            className='max-w-[600px]'
            open={open}
            onClose={onClose}
        >
            <Dialog.Header caption="Создать планировщик" />

            <Dialog.Body>
                {
                  isDashboardsSuccess && isNotificationChannelsSuccess
                    ? (
                      <div className="flex flex-col gap-3">
                        <div className='flex flex-col gap-1'>
                          <Text variant="body-1">
                              Дашборд
                          </Text>

                          {
                            target
                              ? (
                                <TextInput
                                  disabled
                                  value={target}
                                />
                              )
                              : (
                                <Select
                                  placeholder="Выберите дашборд"
                                  value={formValue.dashboard ? [formValue.dashboard] : []}
                                  onUpdate={(val) => setFormValue((form) => ({ ...form, dashboard: val[0] }))}
                                >
                                  {
                                    dashboards!.entries.map((entity) => (
                                      <Select.Option value={entity.entryId}>
                                        {extractDashboardName(entity.key)}
                                      </Select.Option>
                                    ))
                                  }
                                </Select>
                              )
                          }
                        </div>

                        <div className='flex flex-col gap-1'>
                          <Text variant="body-1">
                            Каналы нотификаций
                          </Text>

                          <Select
                            multiple
                            filterable
                            placeholder="Выберите канал нотификаций"

                            value={formValue.notificationChannelIds.map(i => String(i))}
                            onUpdate={(val) => setFormValue((form) => ({ ...form, notificationChannelIds: val.map(v => Number.parseInt(v)) }))}
                          >
                            {
                              notificationChannels!.map((channel) => ((
                                <Select.Option
                                  value={String(channel.id)}
                                  text={channel.type === 'email' ? channel.email : channel.user_id}
                                >
                                  <NotificationChannelName type={channel.type} name={channel.type === 'email' ? channel.email : channel.user_id}  />
                                </Select.Option>
                              )))
                            }
                          </Select>
                        </div>

                        <div className='flex flex-col gap-1'>
                          <Text variant="body-1">
                            Время планирования
                          </Text>

                          <Cron value={formValue.cron} setValue={(cron: string) => setFormValue((form) => ({ ...form, cron }))} />
                        </div>

                      </div>
                    )
                    : (
                      <div className='flex items-center justify-center'>
                        <Loader size='l' />
                      </div>
                    )
                }
            </Dialog.Body>

            <Dialog.Footer
                textButtonCancel="Отмена"
                onClickButtonCancel={onCancel}
                onClickButtonApply={onApply}
                propsButtonApply={{
                    disabled: (!formValue.dashboard && !target) || formValue.notificationChannelIds.length === 0
                }}
                textButtonApply="Создать"
            />
        </Dialog>
    );
}