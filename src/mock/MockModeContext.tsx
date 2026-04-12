import React, { useCallback, useContext, useMemo, useState } from 'react';

export type UEDMode = 'pc' | 'mobile' | 'h5';

export interface UEDSettings {
  mode: UEDMode;
  isLoggedIn: boolean;
  networkDelay: number;
  simulateError: boolean;
  locale: string;
}

interface UEDSettingsContextValue extends UEDSettings {
  setMode: (mode: UEDMode) => void;
  setIsLoggedIn: (v: boolean) => void;
  setNetworkDelay: (ms: number) => void;
  setSimulateError: (v: boolean) => void;
  setLocale: (locale: string) => void;
  updateSettings: (patch: Partial<UEDSettings>) => void;
}

const UEDSettingsContext = React.createContext<UEDSettingsContextValue>(
  {} as UEDSettingsContextValue
);

const STORAGE_KEY = 'ued_settings';

function loadSettings(): UEDSettings {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...defaultSettings, ...JSON.parse(saved) };
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
};

export function UEDSettingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, setSettings] = useState<UEDSettings>(loadSettings);

  const updateSettings = useCallback((patch: Partial<UEDSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
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
