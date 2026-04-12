/* eslint-disable react/no-unescaped-entities */

const fr = {
  authorization_mode_tips: `
      <b>Sans signature</b>
      <br />
      Autorisez une fois et passez des ordres sans signer.
      <br />
      <br />
      <b>Toujours signer</b>
      <br />
      Signez avec votre portefeuille pour passer des ordres pour chaque
      transaction.
    `,
  service_unavailable_for_blacklist: `
      <div>
        Votre accès à DeGate est limité. Pour plus d'informations, visitez{' '}
        <a
          href="https://discord.com/channels/814731180892487702/1086188643342889020"
          target="_black"
        >
          la communauté DeGate
        </a>{' '}
        .
      </div>
    `,
  initialization_desc: `
      Vous recevrez deux demandes de signature. <br />
      La signature est gratuite.
    `,

  device_fast: `
      Votre appareil est <br />
      <b>{time} secondes en avance</b>
    `,
  device_slow: `
      Votre appareil est <br />
      <b>{time} secondes en retard</b>
    `,
  localTime_tips: `
      Réglez le mode de réglage de l'heure de votre appareil sur "Automatique",
      afin que le protocole DeGate puisse fonctionner correctement.
      <br />
      <b>Actualisez la page après avoir apporté la modification.</b>
    `,
};

export default fr;
