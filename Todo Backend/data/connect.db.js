import mongoose from "mongoose";

export const connectDB = async () => {

  try {
   await mongoose.connect(process.env.MONGODB_URI,{
      dbName:process.env.DB_NAME,
  })
    console.log("DB connected Successfully!!!")
  } catch (error) {
       console.log(`Error Message: ${error}`)
  } 

}