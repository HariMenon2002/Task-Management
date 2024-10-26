import mongoose from "mongoose";

let isConnected=false;

export const connectedToDB=async()=>{
    mongoose.set('strictQuery',true);
    if(!process.env.MONGODB_URL) return console.log('MONGODB_URL not found');
    if(isConnected) return console.log('Already connected to MongoDB');

    try{
        await mongoose.connect(process.env.MONGODB_URL);
        isConnected=true;
        console.log("connected to MongoDB")
    }catch(error){
        console.log(error);
        isConnected=false;
    }
}

// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI || '';

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable inside .env');
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;
