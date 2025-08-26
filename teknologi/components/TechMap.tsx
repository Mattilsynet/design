import React from "react";
import styles from "./techMap.module.css";

export function TechMap() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Title title="Vi driver med" />
        <Content
          title="Oppdraget vårt"
          text={`Vi lager systemstøtte for Mattilsynets inspektører som jobber på slakteriene.
            Vi har applikasjoner for kontroll av rødt-, hvitt- og viltkjøtt. Og APIer for
            å integrere med slakteriene og andre aktører.`}
        />
      </div>
      <div className={styles.container}>
        <Title title="Vi er" />
        <Content
          title="En trivelig gjeng"
          text={`Det er kanskje subjektivt, men vi tør påstå det likevel. En designer, en produktleder og et par utviklere.
            Tilsammen balanserer vi mellom å forvalte applikasjonene vi har i bruk og modernisere, sikre og forbedre.`}
        />
      </div>
      <div className={styles.container}>
        <Title title="Prosessen vår" />
        <Content
          title="Minst mulig, men nok"
          text={`Vi prøver å ikke overdrive prosessen vår. Vi har check-in på mandag hvor vi går igjennom boardet vårt
            i <code>Github</code> og Show-and-tell på fredag. Vi har retro annenhver uke og skriftlig standup på <code>Slack</code>.
            Dokumentasjonen vår finner du så nærme koden som mulig eller i en wiki på <code>Github</code>. De lange linjene måler vi med <code>OKR</code>.`}
        />
      </div>
      <WideBox
        title="Teknologi vi liker i bakkant"
        blocks={[
          {
            subtitle: "Språk og rammeverk",
            text: `Vi liker mikrotjenester med <code>Kotlin</code> og <code>SpringBoot</code>.
            Vi jobber tett sammen, så en god del tradisjonell backend flyttes over til <code>Node.js</code>,
            tettere på koden i front.`,
          },
          {
            subtitle: "Data og lagring",
            text: `Vi liker å være konservative med dataene våre, så det meste ender i
            <code>PostgreSQL</code>. Der vi tør å være litt tøffere bruker vi
            KeyValue- og Object-store fra <code>NATS</code>.`,
          },
          {
            subtitle: "Alt det andre",
            text: `Vi er blitt veldig glade i <code>NATS</code>, så hvis vi kan bruke det, så bruker vi det!
            All koden vår kjører i <code>Google Cloud</code> og versjoneres i <code>Github</code>. Vi er
            ganske pedantiske når det gjelder <code>IaC</code>, vi liker ikke click-ops. Til det nivået
            at vi lager vårt eget om det ikke finnes.`,
          },
        ]}
      />
      <WideBox
        title="Teknologi vi liker front"
        blocks={[
          {
            subtitle: "Språk og rammeverk",
            text: `Vi er veldig glade i <code>TypeScript</code>. All frontend koden er samla
            i et monorepo, hvor vi bruker <code>React</code> og <code>Next.js</code>. Vi
            liker React såpass at vi også skriver våre CLI-verktøy og <code>Node.js</code>
            og <code>React</code>. Vi er ikke så glad i <code>Redux</code> og <code>RxJs</code>,
            så det jobber vi oss vekk i fra.`,
          },
          {
            subtitle: "Kommunikasjon",
            text: `Det er ikke bare i bakkant vi liker <code>NATS</code>. Vi legger det vi kan
            i <code>NATS</code> og gjerne i <code>Server Components</code> eller
            <code>Server Actions</code>. Faktisk holder vis oss unna REST og HTTP så langt
            det lar seg gjøre! Og vi liker veldig godt å gjøre mest mulig på serveren.`,
          },
          {
            subtitle: "Alt det andre",
            text: `Vi foretrekker <code>Tailwind</code>. Du vil også finne <code>Yarn</code>,
            <code>oxlint</code>, <code>Prettier</code>, <code>zod</code> og
            <code>react-hook-form</code>. Men vi forsøker å holde bruken av andres kode på et
            rimelig nivå. Vi er også store fans av <code>designsystemet</code>. Du skal heller
            ikke bli overrasket om du finner noen bash script hos oss, vi liker automatisering!`,
          },
        ]}
      />
    </div>
  );
}

function WideBox({
  title,
  blocks,
}: {
  title: string;
  blocks: { subtitle: string; text: string }[];
}) {
  return (
    <div className={styles.widecontainer}>
      <Title title={title} />
      <div className={styles.wide}>
        {blocks.map(({ subtitle, text }) => (
          <Content key={subtitle} title={subtitle} text={text} />
        ))}
      </div>
    </div>
  );
}

function Title({ title }: { title: string }) {
  return (
    <div className={styles.title}>
      <h2>{title}</h2>
    </div>
  );
}

function Content({ title, text }: { title: string; text: string }) {
  return (
    <div className={styles.content}>
      <h3>{title}</h3>
      <div dangerouslySetInnerHTML={{ __html: text }} />
    </div>
  );
}
