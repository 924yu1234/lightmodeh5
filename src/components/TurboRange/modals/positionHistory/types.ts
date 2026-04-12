export type HistoryToken = Record<string, unknown> & {
  amount?: string;
  amount_display?: string;
  amount_display_less8?: string;
};
