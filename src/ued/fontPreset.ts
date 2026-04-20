/** UED / product font preview stacks (Google Fonts loaded in public/index.html). */

export const UED_FONT_PRESETS = [
  'default',
  'instrument_sans',
  'dm_sans',
  'inter',
  'source_han_sans',
] as const;

export type UEDFontPreset = typeof UED_FONT_PRESETS[number];

export function isUEDFontPreset(v: unknown): v is UEDFontPreset {
  return (
    typeof v === 'string' && (UED_FONT_PRESETS as readonly string[]).includes(v)
  );
}

export const UED_FONT_PRESET_OPTIONS: {
  value: UEDFontPreset;
  label: string;
  hint?: string;
}[] = [
  { value: 'default', label: 'Default', hint: 'Open Sans + PingFang SC' },
  {
    value: 'instrument_sans',
    label: 'Instrument Sans',
    hint: '+ Noto Sans SC',
  },
  { value: 'dm_sans', label: 'DM Sans', hint: '+ Noto Sans SC' },
  { value: 'inter', label: 'Inter', hint: '+ Noto Sans SC' },
  {
    value: 'source_han_sans',
    label: '思源黑体',
    hint: 'Noto Sans SC / Source Han Sans SC',
  },
];
