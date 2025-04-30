import express from "express";
import userRoutes from "./routes/user.routes.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import taskRoutes from "./routes/task.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import helmet from 'helmet';


export const app = express();

config({
  path: "./data/config.env",
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.use((req, res, next) => {
    const nonce = generateRandomNonce(); // Same function as above
    res.setHeader("Content-Security-Policy", `default-src 'self'; style-src 'self' 'nonce-${nonce}'; script-src 'self' 'nonce-${nonce}';`);
    res.setHeader("X-Nonce", nonce);
    res.locals.nonce = nonce;
    console.log("NONCE is here => ", nonce)
    next();
});


function generateRandomNonce() {
    return Math.random().toString(36).substr(2);
}



// app.use(helmet.frameguard({ action: 'deny' }));
// app.use(helmet.contentSecurityPolicy({
//   directives: {
//     defaultSrc: ["'self'"],
//     frameAncestors: ["'none'"],
//   },
  
// frameguard: {
//   action: 'deny',  // X-Frame-Options: DENY
// },

// }));

// app.use((req, res, next) => {
//     res.setHeader("X-Frame-Options", "DENY");
//     res.setHeader("Content-Security-Policy", "frame-ancestors 'none';");
//     res.setHeader('Cache-Control', 'no-store');
//     next();
//   });

app.use(
  cors({
    origin: "http://localhost:4200",
    // origin:"http://mylocaldomain.com:4200",
    credentials: true,

    allowedHeaders: ["auth", "refresh-token", "X-XSRF-TOKEN", "Content-Type"],
    exposedHeaders: ["new-auth-token", "new-refresh-token"],
  })
);



app.use((req, res, next) => {
  // console.log("req headers CSRF =>", req.headers)
  const tokenFromHeader = req.headers['x-xsrf-token'];
  console.log("Header from front end =>", tokenFromHeader)
  if (!req.cookies["XSRF-TOKEN"]) {
    const token = uuidv4(); 
    // res.header("XSRF-TOKEN", token)
    res.cookie("XSRF-TOKEN", token, {
      httpOnly: false,
      secure: false,
      sameSite: "Lax",
    });
    // req.csrfToken = token;
  } else {
    // req.csrfToken = req.cookies["XSRF-TOKEN"];
    // console.log("REQ CSRF =>", req)
  }
  next();
});

// app.use(csrfProtection);
// app.use(csrfErrorHandler);

app.use("/user", userRoutes);
app.use("/task", taskRoutes);
app.use("/admin", adminRoutes);
