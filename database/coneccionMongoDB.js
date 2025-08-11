import {MongoClient} from 'mongodb';

const getConnection = async() => {

    try {
        const mongoUrl = "mongodb://localhost:27017/cuentos";
        const client = await MongoClient.connect(mongoUrl);
        return client.db();
    }
    catch (error) {
        console.log(error);
    }

};

export {getConnection};   