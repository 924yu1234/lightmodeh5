import React, { useCallback, useContext, useMemo, useState } from 'react';

import type { UEDFontPreset } from 'src/ued/fontPreset';
import { isUEDFontPreset } from 'src/ued/fontPreset';

export type UEDMode = 'pc' | 'mobile' | 'h5';
export type UEDTheme = 'dark' | 'light';

export interface UEDSettings {
  mode: UEDMode;
  isLoggedIn: boolean;
  networkDelay: number;
  simulateError: boolean;
  locale: string;
  theme: UEDTheme;
  /** Global UI font stack for A/B comparison (UED ⚙ Typography). */
  fontPreset: UEDFontPreset;
}

interface UEDSettingsContextValue extends UEDSettings {
  setMode: (mode: UEDMode) => void;
  setIsLoggedIn: (v: boolean) => void;
  setNetworkDelay: (ms: number) => void;
  setSimulateError: (v: boolean) => void;
  setLocale: (locale: string) => void;
  setTheme: (theme: UEDTheme) => void;
  setFontPreset: (preset: UEDFontPreset) => void;
  updateSettings: (patch: Partial<UEDSettings>) => void;
}

const UEDSettingsContext = React.createContext<UEDSettingsContextValue>(
  {} as UEDSettingsContextValue
);

const STORAGE_KEY = 'ued_settings';

function loadSettings(): UEDSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const raw = JSON.parse(saved) as Partial<UEDSettings>;
      const fontPreset = isUEDFontPreset(raw.fontPreset)
        ? raw.fontPreset
        : defaultSettings.fontPreset;
      return { ...defaultSettings, ...raw, fontPreset };
    }
  } catch {
    // ignore
  }
  return defaultSettings;
}

function saveSettings(settings: UEDSettings) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

const defaultSettings: UEDSettings = {
  mode: 'pc',
  isLoggedIn: true,
  networkDelay: 0,
  simulateError: false,
  locale: 'en-US',
  theme: 'dark',
  fontPreset: 'default',
};

export function UEDSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<UEDSettings>(loadSettings);

  const updateSettings = useCallback((patch: Partial<UEDSettings>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...patch };
      const fontPreset = isUEDFontPreset(merged.fontPreset)
        ? merged.fontPreset
        : defaultSettings.fontPreset;
      const next = { ...merged, fontPreset };
      saveSettings(next);
      return next;
    });
  }, []);

  const value = useMemo(
    (): UEDSettingsContextValue => ({
      ...settings,
      setMode: (mode) => updateSettings({ mode }),
      setIsLoggedIn: (isLoggedIn) => updateSettings({ isLoggedIn }),
      setNetworkDelay: (networkDelay) => updateSettings({ networkDelay }),
      setSimulateError: (simulateError) => updateSettings({ simulateError }),
      setLocale: (locale) => updateSettings({ locale }),
      setTheme: (theme) => updateSettings({ theme }),
      setFontPreset: (fontPreset) => updateSettings({ fontPreset }),
      updateSettings,
    }),
    [settings, updateSettings]
  );

  return (
    <UEDSettingsContext.Provider value={value}>
      {children}
    </UEDSettingsContext.Provider>
  );
}

export function useUEDSettings() {
  return useContext(UEDSettingsContext);
}

export default UEDSettingsContext;
