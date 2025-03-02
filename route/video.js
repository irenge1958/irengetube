const { createcommentV,getcommentV,createV,search,searchs,onechannelvideo,modifyV,deleteV,likeV,dislikeV,addview,trendV,randomV,taggV,getoneV } = require("../controllers/video");
const verifyuser=require('../verifyuser')
const express = require("express");

const video = express.Router();

video.post("/createvideo/:id",createV);
video.post("/commentvideo/:id",verifyuser,createcommentV);
video.put("/modifyvideo/:id/:Id",verifyuser,modifyV);
video.delete("/deletevideo/:id",deleteV);
video.post("/likevideo/:id",verifyuser,likeV)
video.post("/addview/:id",addview)
video.put("/unlikevideo/:id/:Id",verifyuser,dislikeV)
video.get("/search/:q",search)
video.get("/searchs/:q",searchs)
video.get("/trend",trendV)
video.get("/random",randomV)
video.get("/tags",taggV)
video.get("/onechannelvideo/:id",onechannelvideo)
video.get("/getcommentV/:id",getcommentV)
video.get("/getoneV/:id",getoneV)
module.exports =video;