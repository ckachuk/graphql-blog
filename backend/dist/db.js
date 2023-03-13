import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb://localhost/graphql-blog");
        console.log(`Mongodb connected: ${conn.connection.name}`);
    }
    catch (err) {
        console.log(`Error: ${err.message}`);
        process.exit(1);
    }
};
