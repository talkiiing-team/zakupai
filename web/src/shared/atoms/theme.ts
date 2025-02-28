import type { Theme } from '@gravity-ui/uikit'

import { atomWithStorage } from 'jotai/utils'

export const themeAtom = atomWithStorage<Theme>('theme', 'system')
