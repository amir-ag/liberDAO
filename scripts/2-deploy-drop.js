import { ethers } from 'ethers';
import sdk from './1-initialize-sdk.js';
import { readFileSync } from 'fs';

const app = sdk.getAppModule('0x1a487362C0324c5f83565840F6B3EBD442ED1C35');

(async () => {
  try {
    const bundleDropModule = await app.deployBundleDropModule({
      name: 'LiberDAO Membership',
      description: 'A DAO for freedom loving people.',
      image: readFileSync('scripts/assets/6444404_0.jpeg'),
      primarySaleRecipientAddress: '0x1d854FAAaA561d3a377E90140542Be481A5e5Cd8',
    });

    console.log(
      '✅ Successfully deployed bundleDrop module, address:',
      bundleDropModule.address
    );
    console.log(
      '✅ bundleDrop metadata:',
      await bundleDropModule.getMetadata()
    );
  } catch (error) {
    console.log('failed to deploy bundleDrop module', error);
  }
})();
