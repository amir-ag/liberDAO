import sdk from "./1-initialize-sdk.js";

const app = sdk.getAppModule("0x1a487362C0324c5f83565840F6B3EBD442ED1C35");

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      name: "LiberDAO Governance Token",
      symbol: "LIB",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();