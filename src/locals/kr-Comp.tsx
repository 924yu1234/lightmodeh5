const ko = {
  authorization_mode_tips: `
      <b>무서명 모드</b>
      <br />
      한 번 승인하고 서명 없이 주문을 제출합니다.
      <br />
      <br />
      <b>항상 서명</b>
      <br />
      거래마다 지갑으로 서명하여 주문을 제출합니다.
    `,
  service_unavailable_for_blacklist: `
      <div>
        DeGate에 대한 귀하의 접근이 제한되었습니다. 자세한 내용은{' '}
        <a
          href="https://discord.com/channels/814731180892487702/1086188643342889020"
          target="_black"
        >
          DeGate 커뮤니티
        </a>
        를 방문해 주세요.
      </div>
    `,
  initialization_desc: `
      두 개의 서명 요청을 받게 됩니다. <br />
      서명은 무료입니다.
    `,
  device_fast: `
      사용자의 기기가 <br />
      <b>{time}초 빠릅니다</b>
    `,
  device_slow: `
      사용자의 기기가 <br />
      <b>{time}초 느립니다</b>
    `,
  localTime_tips: `
      DeGate 프로토콜이 제대로 작동하도록 기기의 시간 설정을
      &quot;자동&quot;으로 설정하세요.
      <br />
      <b>변경 후 페이지를 새로 고치세요.</b>
    `,
};

export default ko;
