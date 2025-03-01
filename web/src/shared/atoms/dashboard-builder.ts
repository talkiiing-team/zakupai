import { Config, ItemStateAndParams } from '@gravity-ui/dashkit'
import { atom } from 'jotai'

export const dashboardBuilderDashkitConfigAtom = atom<Config>({
  salt: String(Math.random()),
  counter: 1,
  items: [
    {
      id: 'text',
      data: {
        title: 'Добро пожаловать!',
        value: 'Здесь можно построить график)',
      },
      type: 'indicator',
      namespace: 'default',
      orderId: 1,
    },
  ],
  layout: [
    {
      i: 'text',
      w: 40,
      h: 5,
      x: 0,
      y: 0,
    },
  ],
  aliases: {},
  connections: [],
})

export const dashboardBuilderDashkitItemStateAndParamsAtom = atom<ItemStateAndParams>({})
