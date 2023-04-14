import sdk from "./1-initialize-sdk.js";
import { MaxUint256 } from "@ethersproject/constants";

const EDITION_DROP_ADDRESS = '0x30970cC7EAcB1c430D5025bC01FD3A3A4CC2FBbb';
const editionDrop = sdk.getContract(EDITION_DROP_ADDRESS, "edition-drop");

(async () => {
  try {
    const claimConditions = [
      {
        startTime: new Date(),
        maxQuantity: 50_000,
        price: 0,
        quantityLimitPerTransaction: 1,
        waitInSeconds: MaxUint256,
      },
    ];
    await (await editionDrop).claimConditions.set('0', claimConditions);
    console.log('Successfully set claim condition!');
  } catch (error) {
    console.error('failed to set claim condition', error);
  }
})();