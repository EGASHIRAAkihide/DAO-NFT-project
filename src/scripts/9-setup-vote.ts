import sdk from "./1-initialize-sdk.js";
import nextEnv from '@next/env';

const VOTE_ADDRESS = '0x7412a41e2a005B6acf0756d842240d1c39b41A9b';
const TOKEN_ADDRESS = '0x9683903F1Aacf6A403f9F1A034957582873C806F';

const { loadEnvConfig } = nextEnv;
const {
  WALLET_ADDRESS
} = loadEnvConfig(
  process.cwd()
).combinedEnv;

const vote = sdk.getContract(VOTE_ADDRESS, "vote");
const token = sdk.getContract(TOKEN_ADDRESS, "token");

(async () => {
  // 必要に応じて追加のトークンを作成する権限をトレジャリーに与える
  try {
    await (await token).roles.grant("minter", (await vote).getAddress());
    console.log("Successfully gave vote contract premissions to act on token contract");
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  try {
    if (!WALLET_ADDRESS) {
      console.log("you have to set wallet address")
    } else {
      const ownedTokenBalance = await (await token).balanceOf(WALLET_ADDRESS);
      const ownedAmount = ownedTokenBalance.displayValue;
      const percent90 = Number(ownedAmount) / 100 * 90;

      await (await token).transfer(
        (await vote).getAddress(),
        percent90
      );

      console.log("Successfully transferred " + percent90 + " tokens to vote contract");
    }
  } catch (error) {
    console.error(error)
  }
})();
