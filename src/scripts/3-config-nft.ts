import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const EDITION_DROP_ADDRESS = '0x30970cC7EAcB1c430D5025bC01FD3A3A4CC2FBbb';
const editionDrop = sdk.getContract(EDITION_DROP_ADDRESS, 'edition-drop');

(async () => {
  try {
    await (await editionDrop).createBatch([
      {
        name: 'sample nft name',
        description: 'this is the collection that enables to access the NFT',
        image: readFileSync('src/scripts/assets/NFT.png'),
      },
    ]);
    console.log('Successfully created a new NFT in the drop!');
  } catch (error) {
    console.error(error)
  }
})();