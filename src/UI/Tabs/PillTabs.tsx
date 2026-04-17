import React, { useMemo } from 'react';
import { Tabs, TabsProps } from '@mantine/core';

import UISegmentedControl from '../SegmentedControl/UISegmentedControl';

export interface PillTabsProps extends TabsProps {
  tabHeight?: number;
  /** Passed through to `UISegmentedControl` / Mantine `SegmentedControl`. */
  fullWidth?: boolean;
}

function findFirstTabsList(node: React.ReactNode): React.ReactElement | null {
  let found: React.ReactElement | null = null;
  const walk = (n: React.ReactNode) => {
    if (found) return;
    React.Children.forEach(n, (child) => {
      if (found) return;
      if (!React.isValidElement(child)) return;
      if (child.type === Tabs.List) {
        found = child;
        return;
      }
      if (child.props?.children != null) {
        walk(child.props.children as React.ReactNode);
      }
    });
  };
  walk(node);
  return found;
}

function tabItemsFromList(listEl: React.ReactElement) {
  const items: { value: string; label: React.ReactNode }[] = [];
  React.Children.forEach(listEl.props.children as React.ReactNode, (tab) => {
    if (!React.isValidElement(tab) || tab.type !== Tabs.Tab) return;
    const { value: v, children } = tab.props as {
      value?: string | number;
      children?: React.ReactNode;
    };
    if (v === undefined || v === null) return;
    items.push({ value: String(v), label: children });
  });
  return items;
}

/**
 * Pill row with **sliding indicator** (Mantine SegmentedControl + `appearance="pill"`).
 * Keeps the old `<Tabs.List><Tabs.Tab value="…">…</Tabs.Tab></Tabs.List>` API for callers.
 */
export default function PillTabs({
  tabHeight = 42,
  children,
  value,
  onChange,
  className,
  style,
  fullWidth,
}: PillTabsProps) {
  const { data, listClassName, listStyle } = useMemo(() => {
    const list = findFirstTabsList(children);
    if (!list) {
      return {
        data: [] as { value: string; label: React.ReactNode }[],
        listClassName: undefined as string | undefined,
        listStyle: undefined as React.CSSProperties | undefined,
      };
    }
    return {
      data: tabItemsFromList(list),
      listClassName: list.props.className as string | undefined,
      listStyle: list.props.style as React.CSSProperties | undefined,
    };
  }, [children]);

  if (data.length === 0) {
    return null;
  }

  const resolvedValue =
    value === null || value === undefined ? undefined : String(value);

  const mergedClassName = [className, listClassName]
    .filter(Boolean)
    .join(' ')
    .trim();

  return (
    <UISegmentedControl
      appearance="pill"
      pillInnerHeight={tabHeight}
      className={mergedClassName || undefined}
      style={{ ...(listStyle || {}), ...(style || {}) }}
      fullWidth={fullWidth}
      data={data}
      value={resolvedValue}
      onChange={(v: string) => {
        (onChange as ((val: string | null) => void) | undefined)?.(v);
      }}
      withItemsBorders={false}
    />
  );
}
