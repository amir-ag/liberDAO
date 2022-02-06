import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

const tokenModule = sdk.getTokenModule(
  "0x5b3E74B1104BB67a405759682A3613426A122823",
);

(async () => {
  try {
    const amount = 1_000_000;
    // use the util function from "ethers" to convert the amount
    // to have 18 decimals (standard for ERC20 tokens).
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    // mint the tokens
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();
    
    console.log(
      "✅ There now is",
      ethers.utils.formatUnits(totalSupply, 18),
      "$LIB in circulation",
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();