import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x0a293C251B34734D574F09B06f68Ee19F49Dd240",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Access Liberland",
        description: "This NFT will give you access to Liberland!",
        image: readFileSync("scripts/assets/entry.jpeg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()