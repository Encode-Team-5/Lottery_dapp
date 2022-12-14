import Head from "next/head";
import DisplayToken from "../components/display_token";
import PurchaseToken from "../components/purchase-token";
import StatusCheck from "../components/status-check";

export default function Home() {
  //  [0]: Exit
  //  [1]: Check state
  //  [2]: Open bets
  //  [3]: Top up account tokens
  //  [4]: Bet with account
  //  [5]: Close bets
  //  [6]: Check player prize
  //  [7]: Withdraw
  //  [8]: Burn tokens

  return (
    <div className="min-h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="py-2">
        <h1 className="text-3xl font-bold underline text-center">
          Lottery DApp!
        </h1>
        <section className="mx-auto w-11/12 mt-4 flex gap-2 flex-wrap">
          <StatusCheck />
          <PurchaseToken />
          <DisplayToken />
        </section>
      </main>

      {/* <footer>
      </footer> */}
    </div>
  );
}
