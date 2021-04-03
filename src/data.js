'use strict';

const DataModel = require('./item-model.js');

const Data = {};

Data.addAnItem = async(req,res,next) => {
  console.log('adww');
  try {
    const data = req.body;
    const item = new DataModel(data);
    await item.save();
    res.status(200).send(item);
  } catch(e) { next(e.message); }
}

Data.getAllItems = async(req, res) => {
  const items = await DataModel.find({});
  res.status(200).json(items);
}

Data.getOneItem = async(req, res) => {
  const id = req.params.id;
  const items = await DataModel.find({_id:id});
  res.status(200).json(items[0]);
}

Data.deleteOneItem = async(req, res) => {
   console.log('is it working delete back');
   const id = req.params.id;
   await DataModel.deleteOne({_id:id});
   res.status(200).send(`Deleted ${id}`);
}

Data.updateOneItem = async(req, res) => {
  const id = req.params.id;
  const data = req.body;
  const item = await DataModel.findByIdAndUpdate(id, data, {new:true, useFindAndModify:false});
  res.status(200).json(item);
}

module.exports = Data;
