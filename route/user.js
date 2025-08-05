const express = require('express');
const user = express.Router();
const verifyToken=require('../verifyuser')
const { subscribe, unsubscribe, subscribtion, update,searchs,search,mygy,historyp,playlist } = require("../controllers/user");


user.post('/subscribe/:id', subscribe);  // Correct function name
user.put('/unsubscribe/:id', unsubscribe);  // Correct function name
user.get('/subscription/:id', subscribtion);  // Correct function name
user.put('/update/:id', update);  // Correct function name
user.get('/search/:q',search)
user.get('/searchs/:q',searchs)
user.get('/myuser/:id',mygy)
user.post('/history/:id',historyp)
user.post('/playlist/:id',playlist)
module.exports = user;
