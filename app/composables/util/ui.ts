import { formatInTimeZone } from 'date-fns-tz'
import { ko, enUS } from 'date-fns/locale'

export const useUi = () => {
  const { t, locale } = useCustomLocale()

  const genUid = () => {
    return (new Date().getTime() + Math.random().toString(36).substring(2, 16))
  }

  const comma = (value: number) => {
    return String(value).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  }
  const numberRegex = /^[0-9]+$/
  const phoneRegex = /^010\d{3,4}\d{4}$/
  const koreanEnglishNumberRegex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/
  const hyphenRegex = /[^-]+/g
  const englishOnlyRegex = /^[a-zA-Z]+$/

  const uncommaRegex = /(\d)(?=(?:\d{3})+(?!\d))/g
  const commaRegex = /[^\d]+/g
  const hyperLinkRegex = /(mailto:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)|(((?:https?)|(?:ftp)):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|playlist\?|watch\?v=|watch\?.+(?:&|&#38;);v=))([a-zA-Z0-9\-_]{11})?(?:(?:\?|&|&#38;)index=((?:\d){1,3}))?(?:(?:\?|&|&#38;)?list=([a-zA-Z\-_0-9]{34}))?(?:\S+)?/g
  const emailRegex = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/

  const checkHyperLink = (link: string) => {
    const regLink = /(mailto:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)|(((?:https?)|(?:ftp)):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm
    return regLink.test(link)
  }

  const checkYoutubeLink = (link: string) => {
    const regLink = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|playlist\?|watch\?v=|watch\?.+(?:&|&#38;);v=))([a-zA-Z0-9\-_]{11})?(?:(?:\?|&|&#38;)index=((?:\d){1,3}))?(?:(?:\?|&|&#38;)?list=([a-zA-Z\-_0-9]{34}))?(?:\S+)?/g
    return regLink.test(link)
  }

  const checkNumber = (value: string) => {
    return numberRegex.test(value)
  }

  const checkEmail = (email: string) => {
    const regEmail = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
    return regEmail.test(email)
  }

  const digitsRoundUp = (value: number, method: string, digits: number) => {
    let result = 0
    switch (method) {
      case 'round' :
        result = Math.round(value * digits) / digits
        break
      case 'ceil' :
        result = Math.ceil(value * digits) / digits
        break
      case 'floor' :
        result = Math.floor(value * digits) / digits
        break
    }
    return result
  }

  const diffDate = (created: string, current: string) => {
    const oldDate = new Date(created)
    const newDate = new Date(current)
    const diff = Math.ceil(Math.abs(newDate.getTime() - oldDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    return diff
  }

  const nextMonth = (date: string) => {
    return new Date(new Date(date).setMonth(new Date(date).getMonth() + 1))
  }

  const getTimeZone = (date: string) => {
    return date.concat('T00:00:00.000Z')
  }

  const generateNumberArray = (length: number) => {
    return Array.from({ length }, (_, i) => i + 1)
  }

  const generateYearArray = (length: number) => {
    return Array.from({ length }, (_, i) => ({ value: i + 1, label: `${i + 1}년` }))
  }

  const checkArrayEqual = (arr1: any[], arr2: any[]) => {
    if (arr1.length !== arr2.length) {
      return false
    }

    const sortedArr1 = [...arr1].sort((a, b) => a.code.localeCompare(b.code))
    const sortedArr2 = [...arr2].sort((a, b) => a.code.localeCompare(b.code))

    return sortedArr1.every((item, index) => item.code === sortedArr2[index].code)
  }

  const transformChartDate = (date: string | undefined) => {
    if (!date) return ''

    const targetDate = new Date(date)
    const today = new Date()

    const diffTime = today.getTime() - targetDate.getTime()
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    if (today.toDateString() === targetDate.toDateString()) {
      return formatInTimeZone(date, 'Asia/Seoul', 'a h:mm', { locale: locale.value === 'ko' ? ko : enUS })
    }
    else if (diffDays < 30) {
      return t('text.daysAgo', { days: diffDays })
    }
    else {
      const diffMonths = (today.getFullYear() - targetDate.getFullYear()) * 12 + (today.getMonth() - targetDate.getMonth())
      if (diffMonths < 12) {
        return t('text.monthsAgo', { months: diffMonths })
      }
      else {
        const diffYears = today.getFullYear() - targetDate.getFullYear()
        return t('text.yearsAgo', { years: diffYears })
      }
    }
  }

  const convertCurrency = async (amount: number, amountCurrency: string, userCurrency: string) => {
    const resUsd: any = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
    const usdData = await resUsd.json()
    const resKrw: any = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/krw.json')
    const krwData = await resKrw.json()
    const resJpy: any = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/jpy.json')
    const jpyData = await resJpy.json()

    const usdToKrw = usdData.usd.krw
    const usdToJpy = usdData.usd.jpy

    const krwToUsd = krwData.krw.usd
    const krwToJpy = krwData.krw.jpy

    const jpyToUsd = jpyData.jpy.usd
    const jpyToKrw = jpyData.jpy.krw

    if (amountCurrency === 'CYC001') {
      if (userCurrency === 'CYC002') return { amount: parseFloat((amount * krwToUsd).toFixed(2)), currencyCode: 'CYC002' }
      else if (userCurrency === 'CYC003') return { amount: parseFloat((amount * krwToJpy).toFixed(2)), currencyCode: 'CYC003' }
      else return { amount, currencyCode: 'CYC001' }
    }
    if (amountCurrency === 'CYC002') {
      if (userCurrency === 'CYC001') return { amount: parseFloat((amount * usdToKrw).toFixed(2)), currencyCode: 'CYC001' }
      else if (userCurrency === 'CYC003') return { amount: parseFloat((amount * usdToJpy).toFixed(2)), currencyCode: 'CYC003' }
      else return { amount, currencyCode: 'CYC002' }
    }
    else {
      if (userCurrency === 'CYC002') return { amount: parseFloat((amount * jpyToUsd).toFixed(2)), currencyCode: 'CYC002' }
      else if (userCurrency === 'CYC001') return { amount: parseFloat((amount * jpyToKrw).toFixed(2)), currencyCode: 'CYC001' }
      else return { amount, currencyCode: 'CYC003' }
    }
  }

  return {
    genUid,
    comma,
    uncommaRegex,
    commaRegex,
    numberRegex,
    phoneRegex,
    koreanEnglishNumberRegex,
    hyphenRegex,
    englishOnlyRegex,
    hyperLinkRegex,
    youtubeRegex,
    emailRegex,
    passwordRegex,
    checkHyperLink,
    checkYoutubeLink,
    checkNumber,
    checkEmail,
    digitsRoundUp,
    diffDate,
    nextMonth,
    getTimeZone,
    generateNumberArray,
    generateYearArray,
    checkArrayEqual,
    transformChartDate,
    convertCurrency,
  }
}
