import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { filter, map } from 'rxjs';
import * as CryptoJS from "crypto-js";


export const decryptionInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    filter((event): event is HttpResponse<any> => event instanceof HttpResponse),
    map((event: HttpResponse<any>) => {
      console.log("from decryption interceptor => ")
      // console.log("event Body", event.body)
      const secretKey = "sdfghjkl2345678iujhb";

      const dataWithoutPrefix = event.body.replace(/^\)\]\}',\n/, '');

      let bytes = CryptoJS.AES.decrypt(dataWithoutPrefix, secretKey);
    
      let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

      return event.clone({ body: decryptedData });
    })
  );
};
