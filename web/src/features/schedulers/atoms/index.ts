import { atom } from 'jotai';

import { Scheduler } from '../api';

export const currentSchedulerAtom = atom<Scheduler | null>()
export const showSchedulerInfoAtom = atom(false)