const firestore = require('../config/database');
const Users = firestore.collection('users');
const dotenv = require('dotenv')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
dotenv.config()
process.env.TOKEN_SECRET;

function generateAccessToken(param){
    return jwt.sign(param, process.env.TOKEN_SECRET, { expiresIn: '2h'});
  }

const register = async(req,res) => {
    try{
        const email = req.body["email"]
        const password = req.body["password"]
        const login = req.body["login"]
        if(!(email && password && login)){
            res.status(400).send("All input is required");
        }
        let check = false
        await Users.where('email','==', email).get().then(function (querySnapshot) {check = !querySnapshot.empty})
        if(check){ return res.status(409).send("Email already occupied")}
        const encryptedPassword = await bcrypt.hash(password,10);
        const user = await Users.add({
            login: login,
            email : email.toLowerCase(),
            password:encryptedPassword
        });
        res.send("User added successfully")
  } catch (err) {
    console.log(err);
  }
}

const login = async (req,res) => {
    try {
        const email = req.body["email"]
        const password = req.body["password"]

    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    let id;
    await Users.where('email','==',email).get().then(snap => snap.forEach(doc => id = doc.id));
    const doc = Users.doc(id);
    const ref = await doc.get()
    const user = ref.data();

    if (user && (await bcrypt.compare(password, user.password))) {
      user.token = generateAccessToken({id:user.id,email:email})
      res.json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
}

module.exports = {register, login}