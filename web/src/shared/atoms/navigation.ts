import { atomWithStorage } from 'jotai/utils'

export const navigationCompactAtom = atomWithStorage<boolean>('navigation_compact', true)
