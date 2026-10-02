import { createContext, useContext, useEffect } from 'react';
import { SETTINGS } from '../data/store';
import { useLanguage } from './LanguageContext';

const Ctx = createContext({});

export function SettingsProvider({ children }) {
  const { tr } = useLanguage();
  useEffect(() => {
    document.title = `${SETTINGS.brand_name} — ${tr('Browse medicines and health essentials')}`;
  }, [tr]);
  const value = {
    ...SETTINGS,
    loaded: true,
  };
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
export const useSettings = () => useContext(Ctx);
