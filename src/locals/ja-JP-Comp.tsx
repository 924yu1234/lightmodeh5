const ja = {
  authorization_mode_tips: `
      <b>署名なし</b>
      <br />
      1回の認証で、署名なしで注文を出すことができます。
      <br />
      <br />
      <b>常に署名する</b>
      <br />
      各取引につき、ウォレットで署名をして注文を出します。
    `,
  service_unavailable_for_blacklist: `
      <div>
        DeGateへのアクセスは制限されています。詳しくは{' '}
        <a
          href="https://discord.com/channels/814731180892487702/1086188643342889020"
          target="_black"
        >
          DeGate コミュニティ
        </a>{' '}
        をご覧ください。
      </div>
    `,
  initialization_desc: `
      あなたには二つの署名要求があります。 <br />
      署名は無料です。
    `,

  device_fast: `
      デバイスの時間が <br />
      <b>{time} 秒速い</b> です
    `,
  device_slow: `
      デバイスの時間が <br />
      <b>{time} 秒遅い</b> です
    `,
  localTime_tips: `
      デバイスの時間設定を「自動」に設定し、DeGate
      プロトコルが正常に動作するようにしてください。
      <br />
      <b>変更をした後、ページを再読み込みしてください。</b>
    `,
};

export default ja;
