export interface ReferralToken {
  decimals?: number;
  id?: number | string;
  symbol?: string;
  token_id?: number | string;
}

export interface ReferralSummaryData {
  claim_chain?: number | string;
  claim_token_id?: number | string;
  id?: number | string;
  invites_count?: number | string;
  commission_earned?: number | string;
  unclaimed_commission?: number | string;
  referral_code?: string;
  commission_rate?: number | string;
  swap_l2_rate?: number | string;
  turbo_range_l2_rate?: number | string;
  turbo_range_rate?: number | string;
}

export type ReferralTab = 'details' | 'invites';

export interface ReferralDetailRecord {
  activity?: string;
  activity_display?: string;
  activity_from_token_id?: number | string;
  activity_from_token_symbol?: string;
  activity_to_token_id?: number | string;
  activity_to_token_symbol?: string;
  amount_display?: string;
  business_type?: string;
  commission_amount_display?: string;
  commission_display?: string;
  commission_token?: ReferralToken;
  from_token?: ReferralToken;
  from_token_id?: number | string;
  from_token_symbol?: string;
  id?: number | string;
  level?: number | string;
  masked_referee?: string;
  product_name?: string;
  rebated_at?: number;
  referral_level?: number | string;
  status?: string;
  token?: ReferralToken;
  token_symbol?: string;
  to_token?: ReferralToken;
  to_token_id?: number | string;
  to_token_symbol?: string;
  transaction_type?: string;
  type?: string;
  [key: string]: unknown;
}

export interface ReferralInviteRecord {
  estimated_usd_amount?: number | string;
  id?: number | string;
  joined_at?: number;
  masked_referee?: string;
  [key: string]: unknown;
}

export type ReferralTableRecord = ReferralDetailRecord | ReferralInviteRecord;

export interface ReferralListResponse<T> {
  list: T[];
  total: number;
}
