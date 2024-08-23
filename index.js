const express = require("express");
const cors = require("cors");
const Routes = require('./api/routes/userRoutes')
const {databaseConnection} = require('./database')
require("dotenv").config();

const StartServer = async() => {
    const app = express();
    await databaseConnection()
    const corsOptions = {
        origin: '*'
    };
    
    const port = process.env.PORT || 3000;

    // ==============  Middleware ================
    
    app.use(cors(corsOptions));
    app.use(express.json());
    app.use("/", Routes);
    app.all('*', (req, res) => {
        res.send('Page Not Found')
    })
    
    // ============= Middleware ===================
    
    app.listen(port, () => console.log(`Server is listening on port ${port}`)).on('error', (err) => {
        console.log(err);
        process.exit();
    })

};

StartServer();
