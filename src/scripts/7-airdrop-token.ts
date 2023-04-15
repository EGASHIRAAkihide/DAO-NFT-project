import sdk from "./1-initialize-sdk.js";

const EDITION_DROP_ADDRESS = '0x30970cC7EAcB1c430D5025bC01FD3A3A4CC2FBbb';
const TOKEN_ADDRESS = '0x9683903F1Aacf6A403f9F1A034957582873C806F';

// NFT contract address of ERC-1155 membership
const editionDrop = sdk.getContract(EDITION_DROP_ADDRESS, "edition-drop");
const token = sdk.getContract(TOKEN_ADDRESS, "token");

// address of ERC-20 token contract
(async () => {
  try {
    const walletAddresses = await (await editionDrop).history.getAllClaimerAddresses(0);

    if (walletAddresses.length === 0) {
      console.log("No NFTs have been claimed yet, maybe get some friends to claim your free NFTs!")
      process.exit(0);
    }

    const airdropTargets = walletAddresses.map((address) => {
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("Going to airdrop", randomAmount, "tokens to", address);

      const airdropTarget = {
        toAddress: address,
        amount: randomAmount,
      };

      return airdropTarget;
    });

    console.log("1. Starting airdrop...")

    await (await token).transferBatch(airdropTargets)
  } catch (error) {
    console.error(error)
  }
})();
