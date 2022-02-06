import sdk from "./1-initialize-sdk.js";

// Grab the app module address.
const appModule = sdk.getAppModule(
  "0x1a487362C0324c5f83565840F6B3EBD442ED1C35",
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      name: "LiberDAO worldchanging Proposals",
      votingTokenAddress: "0x5b3E74B1104BB67a405759682A3613426A122823",
      proposalStartWaitTimeInSeconds: 0,
      proposalVotingTimeInSeconds: 24 * 60 * 60,
      votingQuorumFraction: 0,
      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address,
    );
  } catch (err) {
    console.error("Failed to deploy vote module", err);
  }
})();
