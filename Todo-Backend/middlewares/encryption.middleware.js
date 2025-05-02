import CryptoJS from "crypto-js";



export const decryptRequest = async (req, res, next) => {

  // console.log(req.body);

  if(req.body.data){
  // let data =[{name:"khan", password:"123487654"}];
 
  // let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data),secretKey).toString();
  // console.log("Encrypted Data Backend: ", encryptedData);
  const secretKey = "sdfghjkl2345678iujhb";
  
  let bytes = CryptoJS.AES.decrypt(req.body.data, secretKey);

  let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));



  console.log("Decrypted Data From Backend: ", decryptedData);

   req.body = decryptedData

     console.log("Request Body Backend: ", decryptedData);

  console.log("in ladder")

  }

    return next();
}