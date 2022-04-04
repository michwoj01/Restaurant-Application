const firestore = require('../config/database');
const Dishes = firestore.collection('dishes');

const addDish = async (req,res) => {
    try{
        const data = {name: req.body["name"],
        images :req.body['images'],
        kuchnia:req.body['kuchnia'],
        kategoria:req.body['kategoria'],
        skladniki: req.body['skladniki'],
        units:req.body['units'],
        price:req.body['price'],
        description:req.body['description']
    };
        const newDoc = await Dishes.add(data);
        res.send({msg:'Dish added successfully'})
    } catch{
        res.status(400).send(error.message);
    }
}
const updateDish = async (req, res) => {
    try{
        await Dishes.doc(req.params.id).set(req.body,{merge:true})
        res.send({msg:"Updated"})
    }catch {
        res.status(500).send(error.message);
    }
}
const deleteDish = async (req, res) => {
    try{
        await Dishes.doc(req.params.id).delete();
        res.send({msg:"Deleted"})
    }catch{
        res.status(600).send(error.message);
    }
}
const getDish = async (req,res) => {
    const snapshot = await Dishes.doc(req.params.id).get().then((doc) => ({id:doc.id, ...doc.data()}));
    res.json(snapshot);
}
const getAll = async (req, res) => {
    const snapshot = await Dishes.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(list);
}
module.exports = {
    addDish,
    updateDish,
    deleteDish,
    getDish,
    getAll
}
    