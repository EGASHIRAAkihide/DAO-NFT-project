import sdk from "./1-initialize-sdk.js";
import { ethers } from "ethers";
import nextEnv from '@next/env';

const VOTE_ADDRESS = '0x7412a41e2a005B6acf0756d842240d1c39b41A9b';
const TOKEN_ADDRESS = '0x9683903F1Aacf6A403f9F1A034957582873C806F';

const vote = sdk.getContract(VOTE_ADDRESS, "vote");
const token = sdk.getContract(TOKEN_ADDRESS, "token");

const { loadEnvConfig } = nextEnv;
const {
  WALLET_ADDRESS
} = loadEnvConfig(
  process.cwd()
).combinedEnv;

(async () => {
  // トレジャリーに420,000のトークンを新しく鋳造する提案を作成
  try {
    const amount = 420_000;
    const description = "Should the DAO mint an additional " + amount + " tokens into the treasury?";
    const executions = [
      {
        toAddress: (await token).getAddress(),
        nativeTokenValue: 0,
        transactionData: (await token).encoder.encode(
          "mintTo", [
            (await vote).getAddress(),
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
      }
    ];

    await (await vote).propose(description, executions);
    console.log("Successfully created proposal to mint tokens");
  } catch (error) {
    console.error(error)
    process.exit(1);
  }

  // 6,900のトークンを自分たちに譲渡するための提案を作成
  try {
    const amount = 6_900;
    const description = "Should the DAO transfer " + amount + " tokens from the treasury to " + WALLET_ADDRESS + " for being awesome?";
    const executions = [
      {
        nativeTokenValue: 0,
        transactionData: (await token).encoder.encode(
          "transfer",
          [
            WALLET_ADDRESS!,
            ethers.utils.parseUnits(amount.toString(), 18),
          ]
        ),
        toAddress: (await token).getAddress(),
      },
    ];
  
    await (await vote).propose(description, executions);
    console.log("Successfully create proposal to reward ourselves from the treasury, let's hope people vote for it!");
  } catch (error) {
    console.error(error);
  }
})();