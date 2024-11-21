export const useUi = () => {
  const { t } = useCustomLocale()

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

  const snsValidate = (sns: string, link: string) => {
    switch (sns) {
      case 'instagram' :
        if (link && !link.includes('instagram.com/')) {
          return t('validate.formatInstagram')
        }
        break
      case 'youtube' :
        if (link && !link.includes('youtube.com/')) {
          return t('validate.formatYoutube')
        }
        break
      case 'x' :
        if (link && !link.includes('x.com/')) {
          return t('validate.formatX')
        }
        break
      case 'kakao' :
        if (link && !link.includes('open.kakao.com/me/')) {
          return t('validate.formatKakao')
        }
        break
      case 'tiktok' :
        if (link && !link.includes('tiktok.com/')) {
          return t('validate.formatTiktok')
        }
        break
      case 'other' :
        if (link && !link.includes('http')) {
          return t('validate.formatOther')
        }
        break
    }
  }

  const uncommaRegex = /(\d)(?=(?:\d{3})+(?!\d))/g
  const commaRegex = /[^\d]+/g
  const hyperLinkRegex = /(mailto:[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)|(((?:https?)|(?:ftp)):\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gm
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|playlist\?|watch\?v=|watch\?.+(?:&|&#38;);v=))([a-zA-Z0-9\-_]{11})?(?:(?:\?|&|&#38;)index=((?:\d){1,3}))?(?:(?:\?|&|&#38;)?list=([a-zA-Z\-_0-9]{34}))?(?:\S+)?/g
  const emailRegex = /^([0-9a-zA-Z_.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,16}$/

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

  const getBusinessStatus = (businessStartTime: string, businessEndTime: string) => {
    const currentTime = new Date().getHours()
    const currentMinute = new Date().getMinutes()

    const startHour = parseInt(businessStartTime.split(':')[0] ?? '0')
    const startMinute = parseInt(businessStartTime.split(':')[1] ?? '0')
    const endHour = parseInt(businessEndTime.split(':')[0] ?? '0')
    const endMinute = parseInt(businessEndTime.split(':')[1] ?? '0')

    if (currentTime >= startHour && currentTime <= endHour) {
      if (currentTime === startHour && currentMinute < startMinute) {
        return '현재 영업중입니다.'
      }
      else if (currentTime === endHour && currentMinute < endMinute) {
        return '현재 영업중입니다.'
      }
      else {
        return '현재 영업시간이 아닙니다.'
      }
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
    snsValidate,
    digitsRoundUp,
    checkHyperLink,
    checkYoutubeLink,
    checkNumber,
    checkEmail,
    diffDate,
    nextMonth,
    getTimeZone,
    generateNumberArray,
    generateYearArray,
    checkArrayEqual,
    getBusinessStatus,
  }
}
