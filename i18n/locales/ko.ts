export default {
  pageTitle: {
    dewbee: 'DewBee',
    main: '메인',
    realtimeSpend: '실시간 지출내역',
    dailySpend: '일일별 지출내역',
    weeklySpend: '주간별 지출내역',
    plan: '요금제',
    login: '로그인',
    settings: '설정',
    profile: '프로필',
    inquiry: '문의하기',
    patchNote: '패치노트',
    copyright: 'Copyright 2024 © Dewdew All Rights Reserved.',
    businessName: '듀듀',
    businessNumber: '사업자등록번호: 482-11-01740',
    businessAddress: '제주시 아연로 171, 301호',
  },
  menu: {
    main: '메인',
    profile: '프로필',
    settings: '설정',
    weeklySpendTarget: '주간지출목표 설정',
    startDay: '시작요일 변경',
    plan: '요금제 변경',
    inquiry: '문의하기',
    patchNote: '패치노트',
    alarm: '알림 설정',
    currency: '화폐변경',
    records: {
      label: '지출내역',
      realtime: '실시간 지출',
      daily: '일일별 지출',
      weekly: '주간별 지출',
    },
    theme: {
      label: '테마변경',
      dark: '다크모드',
      light: '라이트모드',
      system: '시스템',
    },
    language: {
      label: '언어변경',
      ko: '한국어',
      en: '영어',
    },
    signin: '로그인',
    signout: '로그아웃',
    withdraw: '탈퇴',
  },
  button: {
    save: '저장',
    clear: '초기화',
    confirm: '확인',
    cancel: '취소',
    help: '도움말',
  },
  text: {
    CYC001: '원화 (₩)',
    CYC002: '달러 ($)',
    CYC003: '엔화 (¥)',
    EDC001: '월',
    EDC002: '화',
    EDC003: '수',
    EDC004: '목',
    EDC005: '금',
    EDC006: '토',
    EDC007: '일',
    count: '{count}건',
    success: '성공 했어요✨',
    fail: '실패했어요🥲',
  },
  label: {
    nickname: '닉네임',
    category: '카테고리',
    amount: '금액',
    dailySummary: '일일 지출금액',
    weeklySummary: '주간 지출금액',
    weeklyTarget: '지출목표',
    targetBalance: '소비잔액',
    summaryDate: '집계일',
    isSuccess: '달성여부',
    createdAt: '결제일',
    spendId: '지출 ID',
    summaryId: '집계 ID',
  },
  currency: {
    CYC001: '(₩)',
    CYC002: '($)',
    CYC003: '(¥)',
  },
  date: {
    EDC001: '월요일',
    EDC002: '화요일',
    EDC003: '수요일',
    EDC004: '목요일',
    EDC005: '금요일',
    EDC006: '토요일',
    EDC007: '일요일',
  },
  placeholder: {
    targetAmount: '지출목표 금액을 입력해주세요.',
    noSpendRecords: '아직 지출이력이 없어요 🥲',
    noResultRecords: '아직 집계결과가 없어요 🥲',
  },
  intro: {
    title: 'DewBee。',
    subTitle: '매주 당신의 소비금액을 관리해줄거에요.',
    step1: {
      label: 'Step1.',
      title: '매주 지출 목표와 지출목표 요일을 설정해요.',
      description: [
        '고정지출이 아닌, 변동지출을',
        '지출목표로 설정하면 도움이 될거에요!',
      ],
    },
    step2: {
      label: 'Step2.',
      title: '알뜰하게 지출한 내역을 등록해요.',
      description: '카테고리와 금액을 입력하고 저장하면 돼요.',
    },
    step3: {
      label: 'Step3.',
      title: '지출목표 달성여부를 확인할 수 있어요.',
      description: [
        '추가지출이 얼마나 많았는지,',
        '남아있는 여유잔액도 확인 가능해요!',
      ],
    },
    login: '로그인 하시면 아래 기능을 이용 가능해요!',
    plan: '기본적인 사항은 무료로 이용이 가능해요.',
  },
  main: {
    situation: {
      excellent: '목표대비 지출이 훌륭해요!',
      good: '목표대비 지출이 적당해요!',
      warning: '목표대비 지출이 불안해요!',
      danger: '목표대비 지출이 위험해요!',
    },
    setOption: {
      thisWeekend: '이번주 지출은 ',
      records: '이 있어요!',
      currentSpendAmount: '{amount}{currency} 미만으로 지출했는지는,',
      nextWeekend: '다음 주 {endDate}',
      chekable: '에 확인 가능해요!',
    },
    require: {
      category: '카테고리를 선택해요!',
      amount: '금액이 비어있어요!',
    },
    target: 'Target。',
    button: '버튼으로 입력하기',
    manual: '직접 입력하기',
    help: [
      '주간 지출목표와 화폐, 집계마감요일은',
      '\'우측상단 메뉴 > 설정\' 에서 설정 가능해요!',
    ],
    notifications: [
      '[저장기능] 카테고리와 사용금액을 모두 입력해야 가능해요!',
      '[삭제기능] 한번 등록한 내용은 삭제가 불가능하기 때문에 신중히 등록해주세요!',
    ],
  },
  plan: {
    list: [
      {
        title: '무료 요금제',
        description: '대부분의 소비금엑 관리 기능을 사용 가능해요.',
        fee: {
          amount: '무료',
          period: '',
          vat: '',
        },
        features: [
          '무제한 소비내용 입력',
          '지난 4주간 주간별 지출내역 조회',
          '화폐 설정 (₩, $, ¥)',
          '주간 지출집계 마감요일 설정',
        ],
      },
      {
        title: 'Pro 요금제',
        description: '모든 소비금엑 관리 기능을 사용 가능해요.',
        fee: {
          amount: '1,400원',
          period: '월 1회 결제',
          vat: '(V.A.T 포함)',
        },
        features: [
          '모든 무료플랜 기능',
          '모든 (실시간/일일/주간) 지출내역 조회',
          '주간 소비목표 달성여부 기록표 제공',
          '주간 소비목표 달성여부 공유 카드 제공',
          '최신기능 미리 사용기능 제공',
        ],
      },
    ],
  },
  settings: {
    title: {
      currency: '통화',
      targetAmount: '주간지출목표 / {currency}',
      endDate: '집계마감요일',
    },
    description: {
      currency: '지출 등록시 자동으로 설정된 통화로 등록해줘요!',
      targetAmount: '주간 지출목표는, 여유자금으로 지출하고자 하는 일주일간의 금액이에요!',
      endDate: '주간 지출집계는, 집계마감요일 전날까지 사용한 일주일간의 금액을 집계해요!',
    },
  },
  modal: {
    confirmSaveSpend: {
      title: '저장할 지출금액 확인이 필요해요!',
      description: '이번주 목표 지출금액을 초과하는 금액을 입력했어요! 그래도 저장하시겠어요?',
      exceedAmount: '초과금액: {amount}{currency}',
    },
  },
  message: {
    loginSuccess: {
      title: '로그인 성공',
      description: '로그인이 성공적으로 완료되었습니다.',
    },
    loginFailed: {
      title: '로그인 실패',
      description: '로그인에 실패하였습니다.',
    },
    alreadyWithdrawal: {
      title: '이미 탈퇴된 사용자입니다.',
      description: '탈퇴된 사용자는 로그인할 수 없습니다.',
    },
    exceedTargetAmount: {
      title: '너무 많은 금액을 입력하셨어요!',
      description: '이번주 목표 지출금액을 초과하는 금액을 입력하시고 있어요!',
    },
    successSpendAmountSave: '사용내역을 저장했어요!',
  },
}
