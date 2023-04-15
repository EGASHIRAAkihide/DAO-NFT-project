import sdk from "./1-initialize-sdk.js";

const TOKEN_ADDRESS = '0x9683903F1Aacf6A403f9F1A034957582873C806F';
const token = sdk.getContract(TOKEN_ADDRESS, "token");

(async () => {
  try {
    const amount = 1000000;
    await(await token).mint(amount);
    const totalSupply = await (await token).totalSupply();

    console.log(
      "There now is",
      totalSupply.displayValue,
      "$ETHEGA in circulation"
    );
  } catch (error) {
    console.error(error);
  }
})();