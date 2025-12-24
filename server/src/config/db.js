import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const conn = await connect(process.env.MONGODB_URL);
    if (conn) {
      console.log("\n📶 MongoDB connected \n");
    }
  } catch (error) {
    console.log("❌ Error connecting MongoDB \n");
    process.exit(1);
  }
};
export default connectDB;
