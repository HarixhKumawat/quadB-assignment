require("dotenv/config");
const bodyParser = require('body-parser');
const app = require('./app');
const mongoose = require('mongoose');
const port = process.env.PORT || 7000;
const cookieParser = require("cookie-parser");

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("Connected to database...")
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());


app.listen(port, function() {
    console.log(`Listening on port 7000`);
});