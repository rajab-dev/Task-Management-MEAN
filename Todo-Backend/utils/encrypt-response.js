

import CryptoJS from "crypto-js";

export const encryptResponse = (res, data) => {
  const secretKey = "sdfghjkl2345678iujhb"
  let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data),secretKey).toString();
  res.setHeader('Content-Type', 'application/json');
  
  res.json(`)]}',\n${encryptedData}`);

}

