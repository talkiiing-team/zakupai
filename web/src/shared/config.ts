import { type OperatingSystem, getOperatingSystem } from '@siberiacancode/reactuse';

export const CURRENT_OS: OperatingSystem = getOperatingSystem()
export const IS_MOBILE = (['android', 'ios'] as OperatingSystem[]).includes(CURRENT_OS)