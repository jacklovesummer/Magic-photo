
export enum ThemeType {
  TIME_TRAVEL = 'TIME_TRAVEL',
  FAMOUS_PAINTING = 'FAMOUS_PAINTING',
  CRAZY_IDENTITY = 'CRAZY_IDENTITY',
  MORPHING = 'MORPHING'
}

export type Language = 'en' | 'zh';

export interface TransformationOption {
  id: string;
  labelEn: string;
  labelZh: string;
  value: string;
  icon?: string;
}

export interface GenerationResult {
  imageUrl: string;
  promptUsed: string;
}

export interface SlotMachineState {
  occupation: { en: string; zh: string };
  outfit: { en: string; zh: string };
  action: { en: string; zh: string };
}
