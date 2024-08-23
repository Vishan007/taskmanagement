const mongoose = require("mongoose");
require("dotenv").config();

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Db Connected");
        return true
    } catch (error) {
        console.log("Error ============");
        console.log(error);
        return false
    }
};
