import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// ERC-1155 membership NFT contract.
const bundleDropModule = sdk.getBundleDropModule(
  "0x0a293C251B34734D574F09B06f68Ee19F49Dd240",
);

// ERC-20 token contract.
const tokenModule = sdk.getTokenModule(
  "0x5b3E74B1104BB67a405759682A3613426A122823",
);

(async () => {
  try {
    // Grab all the addresses of people who own the membership NFT, which has 
    // a tokenId of 0.
    const walletAddresses = await bundleDropModule.getAllClaimerAddresses("0");
  
    if (walletAddresses.length === 0) {
      console.log(
        "No NFTs have been claimed yet",
      );
      process.exit(0);
    }
    
    // Loop through the array of addresses.
    const airdropTargets = walletAddresses.map((address) => {
      // Pick a random # between 1000 and 10000.
      const randomAmount = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000);
      console.log("✅ Going to airdrop", randomAmount, "tokens to", address);
      
      // Set up the target and amount
      const airdropTarget = {
        address,
        amount: ethers.utils.parseUnits(randomAmount.toString(), 18),
      };
  
      return airdropTarget;
    });
    
    // Call transferBatch on all our airdrop targets.
    console.log("🌈 Starting airdrop...")
    await tokenModule.transferBatch(airdropTargets);
    console.log("✅ Successfully airdropped tokens to all the holders of the NFT!");
  } catch (err) {
    console.error("Failed to airdrop tokens", err);
  }
})();