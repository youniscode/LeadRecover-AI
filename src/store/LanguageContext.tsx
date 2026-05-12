import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type { ReactNode } from 'react'
import type { Language } from '../lib/translations'
import { translations } from '../lib/translations'
import { get, set } from '../lib/storage'

const STORAGE_KEY = 'language'
const DEFAULT_LANG: Language = 'fr'

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

function getNested(obj: unknown, path: string): unknown {
  return path.split('.').reduce((acc, key) => {
    if (acc && typeof acc === 'object' && key in acc) {
      return (acc as Record<string, unknown>)[key]
    }
    return undefined
  }, obj)
}

function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(DEFAULT_LANG)

  useEffect(() => {
    const stored = get<string>(STORAGE_KEY)
    if (stored === 'en' || stored === 'fr') {
      setLangState(stored)
    }
  }, [])

  const setLang = useCallback((next: Language) => {
    setLangState(next)
    set(STORAGE_KEY, next)
  }, [])

  const t = useCallback(
    (key: string): string => {
      const result = getNested(translations[lang], key)
      return typeof result === 'string' ? result : key
    },
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return ctx
}

export { LanguageProvider, useLanguage }
