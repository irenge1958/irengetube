const express = require('express');
const user = express.Router();
const verifyToken=require('../verifyuser')
const { subscribe, unsubscribe, subscribtion, update,searchs,search,mygy,historyp } = require("../controllers/user");


user.post('/subscribe/:id',verifyToken, subscribe);  // Correct function name
user.put('/unsubscribe/:id',verifyToken, unsubscribe);  // Correct function name
user.get('/subscription/:id', subscribtion);  // Correct function name
user.put('/update/:id',verifyToken, update);  // Correct function name
user.get('/search/:q',search)
user.get('/searchs/:q',searchs)
user.get('/myuser/:id',mygy)
user.post('/history/:id',historyp)
module.exports = user;
