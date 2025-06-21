import 'dotenv/config'
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';


let server: Server
const port = 5000;

async function main() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);


        console.log('✅ Connected to MongoDB using Mongoose');

        server = app.listen(port, () => {
            console.log(`🚀 Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log('❌ Error connecting to MongoDB:', error);
    }
}

main();