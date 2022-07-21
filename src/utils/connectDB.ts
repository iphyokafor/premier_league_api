import mongoose from 'mongoose';
import config from 'config';

const connectDB = async () => {

    try {

       await mongoose.connect(config.get('dbUrl'));

        console.log('Database connected...');

    } catch (error: any) {

        console.log(error.message);

        setTimeout(connectDB, 5000);

    }

};

export default connectDB;
