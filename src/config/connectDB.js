const mongoose = require('mongoose');

exports.connectBD = async () => {
    try {
        await mongoose.connect('mongodb+srv://alejodelae:Lateral98@codercluster.valswil.mongodb.net/ecommerce?retryWrites=true&w=majority')
        //await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
        console.log('Base de datos conectada')
    } catch (error) {
        console.log(error)
    }
}