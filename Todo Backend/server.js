import { connectDB } from "./data/connect.db.js";
import { app } from "./index.js";

connectDB();

app.listen(process.env.PORT,()=>{
  console.log(`server is listning on port ${ process.env.PORT }`)
})