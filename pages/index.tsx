import { ConnectWallet, useActiveChain, useAddress, useSwitchChain } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const chain = useActiveChain();
  const switchChain = useSwitchChain();

  const isTestNet = address && chain && chain.testnet

  console.log({
    address,
    chain,
    isTestNet,
    switchChain
  })

  return !isTestNet ? (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>TestNetを使用していないため、ネットワークを切り替えてください</h1>
        <p>
          このdAppはテストネットのみで動作します。
          <br />
          walletから接続中のnetworkを切り替えてください。
        </p>
      </main>
    </div>
  ) : (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          This is the next-typescript-thirdweb app
        </h1>
        <div className={styles.connect}>
          <ConnectWallet />
        </div>
      </main>
    </div>
  );
};

export default Home;
