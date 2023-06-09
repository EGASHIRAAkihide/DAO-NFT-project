import { AddressZero } from "@ethersproject/constants";
import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

(async () => {
  try {
    const editionDropAddress = await sdk.deployer.deployEditionDrop({
      name: "name",
      description: "description",
      image: readFileSync("src/scripts/assets/test.png"),
      primary_sale_recipient: AddressZero,
    });

    const editionDrop = sdk.getContract(editionDropAddress, "edition-drop");
    const metadata = await (await editionDrop).metadata.get();

    console.log(
      "✅ Successfully deployed editionDrop contract, address:",
      editionDropAddress
    );

    console.log("✅ editionDrop metadata:", metadata);
  } catch (error) {
    console.log(error);
  }
})();