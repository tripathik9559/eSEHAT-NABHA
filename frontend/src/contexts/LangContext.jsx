import { createContext, useContext, useState } from 'react'
import { t as translate } from '../i18n/translations'

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem('nabha_lang') || 'en'
  )

  const changeLang = (l) => {
    setLang(l)
    localStorage.setItem('nabha_lang', l)
  }

  const t = (key) => translate(lang, key)

  return (
    <LangContext.Provider value={{ lang, setLang: changeLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
