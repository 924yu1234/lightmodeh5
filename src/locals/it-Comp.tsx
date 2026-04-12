/* eslint-disable react/no-unescaped-entities */

const it = {
  authorization_mode_tips: `
      <b>Senza firma</b>
      <br />
      Autorizza una volta e effettua ordini senza firmare.
      <br />
      <br />
      <b>Sempre firma</b>
      <br />
      Firma con il tuo portafoglio per effettuare ordini per ogni transazione.
    `,
  service_unavailable_for_blacklist: `
      <div>
        Il tuo accesso a DeGate è limitato. Per ulteriori informazioni, visita{' '}
        <a
          href="https://discord.com/channels/814731180892487702/1086188643342889020"
          target="_black"
        >
          la community di DeGate
        </a>{' '}
        .
      </div>
    `,
  initialization_desc: `
      Riceverai due richieste di firma. <br />
      Firmare è gratuito.
    `,
  device_fast: `
      Il tuo dispositivo è <br />
      <b>{time} secondi in anticipo</b>
    `,
  device_slow: `
      Il tuo dispositivo è <br />
      <b>{time} secondi in ritardo</b>
    `,
  localTime_tips: `
      Imposta la modalità di impostazione dell'ora del tuo dispositivo su
      "Automatica", in modo che il protocollo DeGate possa funzionare
      correttamente.
      <br />
      <b>Aggiorna la pagina dopo aver apportato la modifica.</b>
    `,
};

export default it;
