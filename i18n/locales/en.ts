export default {
  pageTitle: {
    dewbee: 'DewBee',
    main: 'Main',
    realtimeSpend: 'Realtime Spend',
    dailySpend: 'Daily Spend',
    weeklySpend: 'Weekly Spend',
    plan: 'Plan',
    login: 'Login',
    settings: 'Settings',
    profile: 'Profile',
    inquiry: 'Inquiry',
    patchNote: 'Patch Note',
    familyService: 'Dewdew Family Service',
    copyright: 'Copyright 2024 © Dewdew All Rights Reserved.',
    businessName: 'Dewdew',
    businessNumber: 'Business Registration Number: 482-11-01740',
    businessAddress: 'Jeju-si Ayeon-ro 171, #301',
    policy: 'Privacy Policy',
  },
  menu: {
    main: 'Main',
    profile: 'Profile',
    settings: 'Settings',
    policy: 'Privacy Policy',
    weeklySpendTarget: 'Weekly Spend Target',
    startDay: 'Start Day',
    plan: 'Plan',
    inquiry: 'Inquiry',
    patchNote: 'Patch Note',
    familyService: 'Family Service',
    alarm: 'Alarm',
    currency: 'Currency',
    records: {
      label: 'Records',
      realtime: 'Realtime Spend',
      daily: 'Daily Spend',
      weekly: 'Weekly Spend',
    },
    theme: {
      label: 'Theme',
      dark: 'Dark Mode',
      light: 'Light Mode',
      system: 'System',
    },
    language: {
      label: 'Language',
      ko: 'Korean',
      en: 'English',
    },
    signin: 'Sign In',
    signout: 'Sign Out',
    withdraw: 'Withdraw',
  },
  button: {
    save: 'Save',
    clear: 'Clear',
    confirm: 'Confirm',
    cancel: 'Cancel',
    help: 'Help',
  },
  text: {
    CYC001: 'KRW (₩)',
    CYC002: 'USD ($)',
    CYC003: 'JPY (¥)',
    EDC001: 'Mon',
    EDC002: 'Tue',
    EDC003: 'Wed',
    EDC004: 'Thu',
    EDC005: 'Fri',
    EDC006: 'Sat',
    EDC007: 'Sun',
    utc: 'UTC {offset}:00',
    count: '{count}',
    success: 'Success!✨',
    fail: 'Fail🥲',
  },
  label: {
    nickname: 'Nickname',
    category: 'Category',
    amount: 'Amount',
    dailySummary: 'Daily Spend',
    weeklySummary: 'Weekly Spend',
    weeklyTarget: 'Target Amount',
    targetBalance: 'Balance',
    summaryDate: 'Summary Date',
    isSuccess: 'Achievement',
    createdAt: 'Payment Date',
    spendId: 'Spend ID',
    summaryId: 'Summary ID',
    prerelease: 'Beta',
    release: 'Release',
    releaseDate: 'Release Date',
  },
  currency: {
    CYC001: '(₩)',
    CYC002: '($)',
    CYC003: '(¥)',
  },
  date: {
    EDC001: 'Monday',
    EDC002: 'Tuesday',
    EDC003: 'Wednesday',
    EDC004: 'Thursday',
    EDC005: 'Friday',
    EDC006: 'Saturday',
    EDC007: 'Sunday',
  },
  timezone: {
    LTZ001: 'Asia/Seoul',
    LTZ002: 'Asia/Tokyo',
    LTZ003: 'America/New_York',
    LTZ004: 'America/Chicago',
    LTZ005: 'America/Denver',
    LTZ006: 'America/Los_Angeles',
    LTZ007: 'America/Anchorage',
    LTZ008: 'America/Hawaii',
    LTZ009: 'Europe/London',
    LTZ010: 'Europe/Paris',
    LTZ011: 'Asia/Bangkok',
    LTZ012: 'Australia/Melbourne',
  },
  placeholder: {
    targetAmount: 'Enter the target amount.',
    noSpendRecords: 'No spend records yet 🥲',
    noResultRecords: 'No result records yet 🥲',
    noPatchNote: 'No patch note yet 🥲',
    noSearch: 'No "{search}" found 🥲',
  },
  intro: {
    title: 'DewBee。',
    subTitle: 'We will help manage your weekly spending.',
    step1: {
      label: 'Step1.',
      title: 'Set your weekly spending target and target day.',
      description: [
        'Setting variable expenses rather than',
        'fixed expenses as your spending target will be helpful!',
      ],
    },
    step2: {
      label: 'Step2.',
      title: 'Register your thrifty spending records.',
      description: 'Just enter the category and amount and save!',
    },
    step3: {
      label: 'Step3.',
      title: 'You can check if you achieved your spending target.',
      description: [
        'You can check how much additional spending',
        'there was and your remaining balance!',
      ],
    },
    login: 'Login to use the below features!',
    plan: 'Basic features are available for free.',
  },
  main: {
    situation: {
      excellent: 'Excellent compared to the target!',
      good: 'Reasonable compared to the target!',
      warning: 'Risky compared to the target!',
      danger: 'Dangerous compared to the target!',
    },
    setOption: {
      thisWeekend: 'This week\'s spending is ',
      records: 'records!',
      currentSpendAmount: 'You spent less than {amount}{currency},',
      nextWeekend: 'Next week {endDate}',
      chekable: 'Checkable!',
    },
    require: {
      category: 'Select a category!',
      amount: 'Amount is empty!',
    },
    target: 'Target。',
    button: 'Enter with buttons',
    manual: 'Enter manually',
    help: [
      'Weekly spend target, currency, and end date can be set',
      'in \'Top right menu > Settings\'!',
    ],
    notifications: [
      '[Save] Category and amount must be entered to save!',
      '[Delete] Please register carefully as once registered, content cannot be deleted!',
    ],
  },
  plan: {
    list: [
      {
        title: 'Free',
        description: 'Most spending management features are available.',
        fee: {
          amount: 'Free',
          period: '',
          vat: '',
        },
        features: [
          'Unlimited spending entry',
          'View weekly spending history for past 4 weeks',
          'Currency settings (₩, $, ¥)',
          'Set weekly spending tally end day',
        ],
      },
      {
        title: 'Pro',
        description: 'All spending management features are available.',
        fee: {
          amount: '1,400 KRW',
          period: 'Monthly billing',
          vat: '(V.A.T included)',
        },
        features: [
          'All Free Plan features',
          'View all spending history (real-time/daily/weekly)',
          'Weekly spending target achievement record provided',
          'Weekly spending target achievement sharing card provided',
          'Early access to new features',
        ],
      },
    ],
  },
  settings: {
    title: {
      currency: 'Currency',
      targetAmount: 'Weekly Spend Target / {currency}',
      endDate: 'Tally End Day',
      localTimezone: 'Local Timezone',
    },
    description: {
      currency: 'The currency is automatically set when you register the spend!',
      targetAmount: 'Weekly spend target is the amount you want to spend for a week as a spare fund!',
      endDate: 'Weekly spend tally is done before the tally end day!',
      localTimezone: 'Local timezone is the timezone used for tallying spend records! Changing it will affect all tally records.',
    },
  },
  modal: {
    confirmSaveSpend: {
      title: 'Need to confirm spend amount to save!',
      description: 'You entered an amount that exceeds this week\'s target spend amount! Do you still want to save?',
      exceedAmount: 'Exceed Amount: {amount}{currency}',
    },
  },
  message: {
    loginSuccess: {
      title: 'Login Success',
      targetAmount: 'Target Amount',
      description: 'Login has been completed successfully.',
    },
    naverNoUseGoogle: 'Naver app does not support Google login!',
    loginFailed: {
      title: 'Login Failed',
      description: 'Login has failed.',
    },
    alreadyWithdrawal: {
      title: 'Already Withdrawal',
      description: 'Withdrawal users cannot login.',
    },
    exceedTargetAmount: {
      title: 'Too much amount!',
      description: 'You are entering an amount that exceeds this week\'s target spend amount!',
    },
    successSpendAmountSave: 'Spend amount has been saved!',
    successSaveSettings: {
      title: '설정을 저장했어요!',
      description: '저장한 설정: {setting}',
    },
  },
}
