import { Button, Dialog, SegmentedRadioGroup, Text, TextInput } from "@gravity-ui/uikit";
import { useState } from "react";

type Props = {
    open: boolean,
    onClose: () => void,
    onApply: () => void
};

export function CreateNotificationChannelDialog({ open, onClose, onApply: onDialogApply }: Props) {
    const [formValue, setFormValue] = useState<
        { type: 'telegram';  } | { type: 'email'; email: string }
    >({ type: 'telegram' });

    const onCancel = () => {
        onClose();
    };

    const onApply = () => {
        console.log(formValue);
        // onDialogApply();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <Dialog.Header caption="Создать канал нотификаций" />
            <Dialog.Body>
                <div className="flex flex-col gap-2">
                    <Text variant="body-1">
                        Тип
                    </Text>
                    <SegmentedRadioGroup defaultValue={formValue.type} onUpdate={(newValue) => setFormValue(newValue === 'email' ? { type: 'email', email: ''} : { type: 'telegram'})}>
                        <SegmentedRadioGroup.Option value="telegram">
                            Telegram
                        </SegmentedRadioGroup.Option>
                        <SegmentedRadioGroup.Option value="email">
                            Email
                        </SegmentedRadioGroup.Option>
                    </SegmentedRadioGroup>
                    {formValue.type === 'email' && <>
                        <Text variant="body-1" className="mt-4">
                            Email
                        </Text>
                        <TextInput value={formValue.email} onUpdate={(newValue) => setFormValue(formValue.type === 'email' ? { type: 'email', email: newValue} : { type:'telegram' })} />
                    </>}
                    {formValue.type === 'telegram' && <>
                        <Text variant="body-1" className="mt-4 max-w-96">
                            Чтобы создать канал нотификаций в Telegram, перейдите по кнопке в диалог с ботом,
                            и нажмите кнопку "Start".
                        </Text>
                        <Button
                            view="action"
                            href="https://t.me/zakupai_tender_bot?start="
                            target="_blank"
                            size="l"
                        >
                            Открыть в Telegram
                        </Button>
                    </>}
                </div>
            </Dialog.Body>
            <Dialog.Footer
                textButtonCancel="Отмена"
                onClickButtonCancel={onCancel}
                onClickButtonApply={onApply}
                propsButtonApply={{ disabled: formValue.type === 'telegram' || formValue.email.length < 1 }}
                textButtonApply="Создать"
            />
        </Dialog>
    );
}