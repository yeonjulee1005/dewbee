export const useCustomLocale = () => {
  const { t, tm, locale, setLocale, setLocaleCookie } = useI18n()
  return { t, tm, locale, setLocale, setLocaleCookie }
}
