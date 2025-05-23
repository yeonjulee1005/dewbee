<script setup lang="ts">
const { t } = useCustomLocale()

const { url } = useImageStorage()

const { mobileOperationSystem } = storeToRefs(useWindowStore())

useHead({
  title: t('pageTitle.policy'),
  meta: [{ name: 'description', content: t('pageDescription.policy') }],
})

definePageMeta({
  layout: 'center',
})

const tradeTerms = ref({
  title: t('pageTitle.policy'),
  content: [
    {
      title: '제1조 (개인정보 보호와 처리방침)',
      content: [
        '“DewBee 개인정보 처리방침”이란 사용자의 소중한 개인정보를 보호함으로써 사용자가 안심하고 서비스를 이용할 수 있도록 Dewbee의 (이하 “개발자”라 함)을 운영함에 있어 준수해야 할 지침을 의미하며, 개발자는 대한민국의 개인정보보호 규정 및 가이드라인을 준수하고 있습니다.',
        '개발자는 사용자의 ‘동의를 기반으로 개인정보를 수집·이용 및 제공’ 하고 있으며, ‘사용자의 권리(개인정보 자기결정권)를 적극적으로 보장’ 합니다.',
        '본 개인정보처리방침은 개발자가 운영하는 서비스에서 적용되는 것을 원칙으로 하며 본 개인정보처리방침은 대한민국 법령에 의하여 규정되고 해석됩니다.',
        '본 개인정보 처리방침은 개발자에서 제공하는 서비스 (Dewbee 앱과 웹사이트, 컨텐츠등 기타 당사가 제공하는 그 외의 서비스 포함) 이용 시 적용되며, 아래의 조건에 부합할 경우 적용됩니다.',
        'Dewbee 서비스를 이용하는 사용자(회원) : Dewbee에서 제공하는 서비스를 요청하거나 제공 받는 이용자',
      ],
      subContent: [],
    },
    {
      title: '제2조 (개인정보 수집 항목 및 방법)',
      content: [
        '모든 사용자는 개발자가 제공하는 서비스를 이용할 수 있고, 개발자의 다양한 서비스를 제공받을 수 있습니다.',
        '개발자는 서비스 제공에 필요한 최소한의 개인 정보를 수집하고 있습니다. 그리고 이때 개발자는 다음의 원칙 하에 사용자의 개인정보를 수집하고 있습니다.',
      ],
      subContent: [
        {
          title: '개인정보 수집 항목',
          content: [
            '서비스 이용: 이메일, 닉네임, 사용자이미지',
            '서비스 가입: 이메일 주소, 닉네임',
            '서비스 중 자동 수집: 쿠키, IP Address, 방문 일시, 사용자의 사용 OS, 기기 고유번호, 서비스 이용 기록, 불만 및 분쟁처리 기록',
          ],
        },
      ],
    },
    {
      title: '제3조 (개인정보 이용 목적)',
      content: [
        '개발자는 사용자의 소중한 개인정보를 다음과 같은 목적으로만 이용하며, 목적이 변경될 경우에는 사전에 사용자의 동의를 구하도록 하겠습니다.',
        '기기의 고유한 번호로 사용자를 식별하고, 불량 회원의 부정한 이용을 방지하기 위하여 사용합니다.',
        '사용자에게 개발자의 다양한 서비스를 제공하고 서비스 이용 과정에서 사용자의 문의 사항이나 불만을 처리하고 공지사항 등을 전달하기 위해 사용합니다.',
        '회원 가입 및 관리, 사용자와 약속한 서비스를 제공하고 유료 서비스 구매 및 이용이 이루어지는 경우 이에 따른 요금 정산을 위해 사용됩니다.',
        '법령상 요구되는 동의를 구하여 이용자에게 마케팅 및 기타 안내 메시지 전송, 신규 서비스가 개발되거나 이벤트 행사 시 참여 기회를 알리기 위한 정보 전달에도 사용됩니다.',
        '사용자의 이용 패턴과 접속 빈도 분석 및 서비스 이용에 대한 통계 및 이를 통한 맞춤형 서비스 제공 및 서비스 개선에도 사용됩니다.',
        'Google, Facebook 등 외부 애드서버 제휴업체에서 사용자나 유사 잠재고객에게 인터넷 탐색 시 방문하는 웹사이트에 광고를 개제하는 등의 적절한 광고메세지를 전달할 수 있습니다.',
      ],
      subContent: [],
    },
    {
      title: '제4조 (개인정보 보유 및 기간)',
      content: [
        '개발자는 사용자의 개인정보를 서비스 이용 시작일부터 서비스를 제공하는 기간 동안에만 제한적으로 이용하고 있습니다.',
        '만약 사용자가 개인정보 삭제를 요청하거나 제공한 개인정보의 수집 및 이용에 대한 동의를 철회하는 경우, 또는 수집 및 이용목적이 달성되거나 보유 및 이용기간이 종료한 경우 해당 사용자의 개인정보는 지체 없이 파기됩니다.',
        '그리고 관계 법령의 규정에 따라 일정한 기간 동안 회원정보를 보관하며 자세한 내용은 아래와 같습니다.',
      ],
      subContent: [
        {
          title: '부정기록 보유',
          content: [
            '내부 방침에 의한 정보보유(부정 이용 방지) - 1년',
          ],
        },
        {
          title: '계약 또는 청약철회 등에 관한 기록',
          content: [
            '전자상거래 등에서 소비자 보호에 관한 법률 제6조 및 시행령 제6조 - 5년',
          ],
        },
        {
          title: '대금결제 및 재화 등의 공급에 관한 기록',
          content: [
            '전자상거래 등에서 소비자 보호에 관한 법률 제6조 및 시행령 제6조 - 5년',
          ],
        },
        {
          title: '소비자 불만 또는 분쟁처리에 관한 기록',
          content: [
            '전자상거래 등에서 소비자 보호에 관한 법률 제6조 및 시행령 제6조 - 3년',
          ],
        },
        {
          title: '표시/광고에 관한 기록',
          content: [
            '전자상거래 등에서 소비자 보호에 관한 법률 제6조 및 시행령 제6조 - 6개월',
          ],
        },
        {
          title: '신용정보의 수집/처리 및 이용 등에 관한 기록',
          content: [
            '신용정보의 이용 및 보호에 관한 법률 제20조 제2항 - 5년',
          ],
        },
        {
          title: '전자금융에 관한 기록',
          content: [
            '전자금융거래법 제22조 제1항 및 시행령 제12조 제1항 - 5년',
          ],
        },
        {
          title: '로그인 기록',
          content: [
            '통신비밀보호법 제15조의2 및 시행령 제41조 제2항 제2호 - 3개월',
          ],
        },
      ],
    },
    {
      title: '제5조 (개인정보의 제공 및 위탁)',
      content: [
        '개발자는 사용자의 개인정보를 제3조에 명시한 목적 범위 안에서만 사용하며, 예외적으로 사용자의 명시적 동의가 있거나 법률의 특별한 규정이 있는 경우 및 사용자의 생명,안전에 급박한 위험이 발생하여 이를 해소하기 위한 경우에 한하여 개인정보를 제3자에게 제공합니다.',
      ],
      subContent: [
        {
          title: '수탁업체: Supabase',
          content: [
            '정보 저장',
            '회원 탈퇴 시 또는 위탁 계약 종료시까지',
          ],
        },
        {
          title: '수탁업체: 토스페이먼츠 주식회사',
          content: [
            '전자 결제서비스',
            '회원 탈퇴 시 또는 위탁 계약 종료시까지',
          ],
        },
      ],
    },
    {
      title: '제6조 (개인정보 제 3자 제공)',
      content: [
        '개발는 원칙적으로 사용자의 동의 없이 개인정보를 제3자에게 제공하지 않으며, 개인정보를 제3자에게 제공해야 하는 경우 법령에 따른 동의를 받고 있습니다. 다만 사용자가 사전에 공개하거나 또는 제3자 제공에 동의한 경우, 법원 등 국가기관이 법령에 근거하여 사용자의 개인정보를 제공하도록 강제한 경우는 예외로 하고 있습니다.',
        '개발는 서비스 제공을 위해서 아래와 같이 업무를 위탁 또는 제휴하는 경우, 관계 법령에 따라 위탁 및 제휴계약 시 제공하는 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다.',
        '다만, 사용자는 관련법에 따라 수집한 개인정보의 업무위탁에 따른 제공 동의를 거부할 권리가 있으며, 미동의시 서비스 이행을 위한 위탁업체 제공이 불가능하여 서비스 제한을 받으실 수 있습니다.',
      ],
      subContent: [],
    },
    {
      title: '제7조 (개인정보 파기)',
      content: [
        '개발자는 사용자의 개인정보에 대해 “개인정보의 수집·이용 목적이 달성”된 후에는 해당 정보를 재생할 수 없는 기술적인 방법을 이용하여 완전하게 삭제하게 되고, 종이로 출력된 개인정보는 분쇄하거나 소각하여 지체 없이 파기함을 약속합니다.',
        '1년 동안 서비스를 이용하지 않은 사용자의 개인정보는 별도로 분리하여 안전하게 보관하고 있습니다.',
      ],
      subContent: [],
    },
    {
      title: '제8조 (사용자 및 법정대리인의 권리·의무 및 행사방법)',
      content: [
        '개발자는 서비스 이용에 대해, 사용자의 권리를 보호하고 있습니다.',
        '사용자는 개발자에게 "개인정보 열람요구", "오류 등이 있을 경우 정정 요구", "삭제요구", "처리정지 요구" 대해 언제든지 개인정보 보호 관련 권리를 행사할 수 있습니다.',
        '제1항에 따른 권리 행사는 개발에 대해 서면, 전화, 전자우편, 모사전송(FAX) 등을 통하여 하실수 있으며 개발자는 이에 대해 지체없이 조치하겠습니다.',
        '사용자가 개인정보의 오류 등에 대한 정정 또는 삭제를 요구한 경우에는 개발자는 정정 또는 삭제를 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.',
        '만 14세 미만 아동의 경우, 제1항에 따른 권리 행사는 사용자의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수 있습니다. 이 경우, 법정대리인은 사용자의 모든 권리를 가집니다.',
        '사용자는 정보통신망법, 개인정보보호법 등 관계법령을 위반하여 개발지가 처리하고 있는 사용자 본인이나 타인의 개인정보 및 사생활을 침해하여서는 아니됩니다.',
      ],
      subContent: [],
    },
    {
      title: '제9조 (쿠키(Cookie)의 설치, 운영 및 그 거부에 관한 사항)',
      content: [
        '쿠키(Cookie)는 웹사이트를 운영하는데 이용되는 서버가 사용자의 컴퓨터로 전송하는 아주 작은 텍스트 파일로서 사용자의 컴퓨터 하드디스크에 저장되고 있습니다. 따라서 사용자 스스로가 쿠키의 설치 및 수집에 대해 자율적으로 선택할 수 있으므로 수집을 거부할 수 있습니다. 다만, 쿠키의 저장을 거부할 경우 로그인이 필요한 일부 서비스의 이용에 제한이 생길 수 있습니다.',
        '사용하는 브라우저에 따라 다르지만, 아래의 예시와 같이 모든 부라우저에서 쿠키 설정을 진행할 수 있습니다.',
        '웹 브라우저 우측 상단의 “아이콘” 선택 > “설정”선택 > 화면 하단의 “고급 설정 표시” 선택 >개인정보 섹션의 “콘텐츠 설정” 버튼 > 쿠키 섹션에서 직접 설정',
      ],
      subContent: [],
    },
    {
      title: '제10조 (링크 사이트에 대한 책임)',
      content: [
        '개발자는 사용자에게 다른 웹사이트에 대한 링크를 제공할 수 있습니다. 다만, 링크되어 있는 웹사이트들이 개인정보를 수집하는 행위에 대해서는 본 "개인정보처리방침"이 적용되지 않습니다.',
      ],
      subContent: [],
    },
    {
      title: '제11조 (개인정보의 기술적/관리적 보호 대책)',
      content: [
        '개발자는 사용자들의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음 각 호와 같은 기술적/관리적 대책을 강구하고 있습니다.',
      ],
      subContent: [],
    },
    {
      title: '제12조 (개인정보 관리 책임자)',
      content: [
        '개인정보 관리 책임자: 이연주 / 010-5161-6876 / yeonju.lee1005@kakao.com',
        '또한 개인정보가 침해되어 이에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하셔서 도움을 받으실 수 있습니다.',
      ],
      subContent: [
        {
          title: '개인분쟁조정위원정',
          content: [
            'http://www.1336.or.kr 또는 1336',
          ],
        },
        {
          title: '정보보호마크인증위원정',
          content: [
            'http://www.eprivacy.or.kr 또는 02-580-0533~4',
          ],
        },
        {
          title: '대검찰청 인터넷범죄수사센터',
          content: [
            'http://icic.sppo.go.kr 또는 02-3480-3600',
          ],
        },
        {
          title: '경찰청 사이버테러대응센터',
          content: [
            'http://www.ctrc.go.kr 또는 02-392-0330',
          ],
        },
      ],
    },
    {
      title: '제13조 (고지의 의무)',
      content: [
        '개발자는 위 내용에 대한 추가, 삭제 및 수정이 있을 경우에는 시행하는 날로부터 최소 7일전에 각 서비스의 공지사항을 통해 사용자에게 설명 드리겠습니다.',
        '다만 사용자의 소중한 권리 또는 의무에 중요한 내용 변경은 최소 30일 전에 알려 드리겠습니다.',
      ],
      subContent: [
        {
          title: '',
          content: [
            '개인정보처리방침 시행일자: 2024년 11월 15일',
            '개인정보처리방침 변경공고일자: 2024년 11월 15일',
          ],
        },
      ],
    },
  ],
})
</script>

<template>
  <div
    class="w-dvw lg:w-[500px] flex flex-col gap-y-8 py-4 px-8"
    :class="{ 'mt-10': mobileOperationSystem === 'android' }"
  >
    <NuxtImg
      class="w-40 cursor-pointer"
      :src="url(true, '/assets/dewbee_logo.webp')"
      loading="lazy"
      placeholder
      format="webp"
      alt="DewBee Logo"
    />
    <div class="flex flex-col gap-y-4">
      <h3 class="text-2xl font-bold break-keep">
        {{ tradeTerms.title }}
      </h3>
      <div
        v-for="(item, index) in tradeTerms.content"
        :key="index"
        class="flex flex-col gap-y-1.5"
      >
        <h4
          v-if="item.title"
          class="text-xl font-semibold break-keep"
        >
          {{ item.title }}
        </h4>
        <ol class="text-sm font-light break-keep list-decimal">
          <li
            v-for="(itemContent, contentIndex) in item.content"
            :key="contentIndex"
            class="ml-6"
          >
            {{ itemContent }}
          </li>
        </ol>
        <div
          v-for="(itemSubContent, subContentIndex) in item.subContent"
          :key="subContentIndex"
          class="flex flex-col text-sm font-light break-keep ml-4"
        >
          {{ itemSubContent.title }}
          <ol class="text-xs mt-1 break-keep list-decimal">
            <li
              v-for="(subContentDetail, subContentDetailIndex) in itemSubContent.content"
              :key="subContentDetailIndex"
              class="ml-6"
            >
              {{ subContentDetail }}
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>
