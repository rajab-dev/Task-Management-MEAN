

import csurf from 'csurf';
import { encryptResponse } from '../utils/encrypt-response.js';

// const csrfProtection = csurf({ cookie: true });

const csrfMiddleware = (req, res, next) => {
  // console.log("Token from Backend =>", req.cookies['XSRF-TOKEN']);
  // console.log("Token from FrontEnd =>", req.headers['x-xsrf-token']);
  // console.log("Headers from FrontEnd =>", req.headers);

  const token = req.headers['x-xsrf-token'] || req.body.csrfToken || req.query.csrfToken;
  if (token !== req.cookies['XSRF-TOKEN']) {
      return encryptResponse(res, {success:false, error: 'Invalid CSRF token' });
  }
  next();

}

// const csrfErrorHandler = (err, req, res, next) => {
//   if (err.code === 'EBADCSRFTOKEN') {
//     // Invalid or missing CSRF token
//     console.log("Invalid CSRF TOKEN =>", err.code);
//     return encryptResponse(res, {success:false, error: 'Invalid CSRF token from Backend' });
//   }
//   next(err); // Pass other errors to the next handler
// };

export { csrfMiddleware }