import { HttpInterceptorFn } from '@angular/common/http';
import * as CryptoJS from "crypto-js";


export const encryptionInterceptor: HttpInterceptorFn = (req, next) => {

  let data = req.body;
  const secretKey = "sdfghjkl2345678iujhb"
  let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data),secretKey).toString();

  
  if(req.body){

  console.log("from encryption interceptor =>")  
  console.log("found content in request.body =>")
    req = req.clone({
      body: {data: encryptedData}
    })

    }
   return next(req)
};
