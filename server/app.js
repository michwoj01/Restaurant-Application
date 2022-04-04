const {addDish,updateDish,deleteDish,getDish,getAll} = require('./controllers/dishController')
const {register,login} = require('./middleware/auth')
const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json())
app.use(express.json());

app.get('/dishes',getAll);
app.get('/dishes/:id',getDish);
app.post("/create",addDish);
app.post("/register",register);
app.post("/login",login)
app.put("/dishes/:id",updateDish);
app.delete("/dishes/:id",deleteDish);
module.exports = app;