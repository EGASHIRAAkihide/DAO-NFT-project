import sdk from "./1-initialize-sdk.js";

const TOKEN_ADDRESS = '0x9683903F1Aacf6A403f9F1A034957582873C806F';
const token = sdk.getContract(TOKEN_ADDRESS, "token");

(async () => {
  try {
    const allRoles = await (await token).roles.getAll();
    console.log("Roles that exist right now: ", allRoles);

    await (await token).roles.setAll({ admin: [], minter: [] });
    console.log(
      "Roles after revoking ourselves",
      await (await token).roles.getAll()
    );
    console.log("Successfully revoked our superpowers from the ERC-20 contract");
  } catch (error) {
    console.error(error)
  }
})();