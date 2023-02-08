const mongoose = require("mongoose")

const { MONGODB_URL } = process.env

exports.dbConnect = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((conn)=>{
        console.log("Database connected successfully...")
        console.log(`Host name ${conn.connection.host}`);
    })
    .catch((error)=>{
        console.log("Database connection failed!")
        console.log(`DB connection Error: ${error}`)
        process.exit(1)
    })
}