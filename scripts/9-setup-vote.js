import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

//governance contract.
const voteModule = sdk.getVoteModule(
  "0x0Fed8f97dbD52586974a7fAC5ca3246092b41afd",
);

//ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0x5b3E74B1104BB67a405759682A3613426A122823",
);

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent50 = ownedAmount.div(100).mul(50);

    await tokenModule.transfer(
      voteModule.address,
      percent50
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();