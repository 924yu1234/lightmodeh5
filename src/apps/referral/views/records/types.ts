import { ReactNode } from 'react';

export interface ReferralTableColumn<T> {
  dataIndex?: string[];
  render?: (value: unknown, record: T) => ReactNode;
  title: string;
  width?: number;
}
