// src/utils/AssetUtils.ts
export const SafeAssets = {
  updates: require('../../assets/images/whatsapp-status.png'),
  tools: require('../../assets/images/tools.png'),
  leo: require('../../assets/images/user-placeholder.png'),
  sharpZee: require('../../assets/images/user-placeholder.png'),
  bob: require('../../assets/images/user-placeholder.png'),
  dwayne: require('../../assets/images/user-placeholder.png'),
  jordan: require('../../assets/images/user-placeholder.png'),
};

export const getSafeAsset = (key: keyof typeof SafeAssets) => {
  return SafeAssets[key];
};
