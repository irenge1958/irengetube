const video=require('../modal/video')
const user=require('../modal/user')
const createError=require('../createError')
const comments=require('../modal/comments')
const createV=async(req,res,next)=>{
 
    const mytagg=req.body.tagg.split(",")
    try{
        const newVideo=await video.create({
        userID:req.params.id,
        pic:req.body.pic,
        videourl:req.body.videourl,
        title:req.body.title,
        tagg:mytagg,
        description:req.body.description
    })
    res.status(200).json(newVideo)
    }catch(err){
    next(err)
    }
}
const search= async (req, res) => {

    try {
      const results = await video.find({ title: { $regex: `^${req.params.q}`, $options: 'i' } }); // Find items starting with the provided string (case-insensitive)
      res.json(results).status(200);
    } catch (error) {
      console.error('Error searching:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const getoneV= async (req, res) => {
    console.log(req.params.id)
    try {

      const results = await video.findById(req.params.id); // Find items starting with the provided string (case-insensitive)
      console.log(results)
     
      res.json(results).status(200);
    } catch (error) {
      console.error('Error searching:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
 
  const searchs= async (req, res) => {
      try {
        const results = await video.find({ title:  req.params.q }); // Find items starting with the provided string (case-insensitive)
        res.json(results).status(200);
      } catch (error) {
        console.error('Error searching:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    };
const onechannelvideo=async (req,res,next)=>{
    try{
const videos=await video.find({userID:req.params.id})
res.status(200).json(videos)
    }catch(err){
  next(err)
    }
}
const modifyV =async (req, res,next) => {
   
    if (req.params.id!==req.user.id) return next(createError(401,'cannot update other\'s information')) 
    const updateduser=await video.findByIdAndUpdate(req.params.Id,{$set:req.body},{new:true})
    
    if (!updateduser) return next(createError(404,'video not found'))
    res.status(200).json(updateduser)
    }
    const deleteV =async (req, res,next) => {
   
        console.log(req.params.id)
        const updateduser=await video.findByIdAndDelete(req.params.id)
        
        if (!updateduser) return next(createError(404,'video not found'))
        res.status(200).send('deleted successfully')
        }
        const likeV = async (req, res, next) => {
           
       
            try {
                const videos = await video.findById(req.params.Id);
               
                if (!videos) return next(createError(404, 'Video not found'));
        
                // Check if the user has already liked || disliked the video
                const isLiked = videos.likes.includes(req.params.id);
                const isdisLiked = videos.dislikes.includes(req.params.id);
                isdisLiked && await video.findByIdAndUpdate(
                    req.params.Id, { $pull: { dislikes: req.params.id } } ,{ new: true }
                );
                // Update the likes array accordingly
                const updatedVideo = await video.findByIdAndUpdate(
                    req.params.Id,
                    isLiked ? { $pull: { likes: req.params.id } } : { $addToSet: { likes: req.params.id } }, 
                    { new: true }
                );
     
                res.status(200).json(updatedVideo);
            } catch (err) {
                next(err);
            }
        };
        const dislikeV = async (req, res, next) => {
        
        
            try {
                const videos = await video.findById(req.params.Id);
                if (!videos) return next(createError(404, 'Video not found'));
        
                // Check if the user has already liked ordsiliked the video
                const isdisLiked = videos.dislikes.includes(req.params.id);
                const isLiked = videos.likes.includes(req.params.id);
                isLiked && await video.findByIdAndUpdate(
                    req.params.Id, { $pull: { likes: req.params.id } }, 
                );
                // Update the likes array accordingly
                const updatedVideo = await video.findByIdAndUpdate(
                    req.params.Id,
                    isdisLiked ? { $pull: { dislikes: req.params.id } } : { $addToSet: { dislikes: req.params.id } }, 
                    { new: true }
                );
        
                res.status(200).json(updatedVideo);
            } catch (err) {
                next(err);
            }
        };
        const addview =async(req,res,next)=>{
           const addv=await video.findByIdAndUpdate(
            req.params.id,{$inc:{view:+1}}
        ); 
        if (!addv) return next(createError(404, 'Video not found'));
        res.status(200).send('added suuccessfully')
        } 
        const randomV=async(req,res,next)=>{
            try{
             const randomv=await video.aggregate([{$sample:{size:40}}])
             res.status(200).json(randomv)
            }catch(err){
            next(err)
            }
        }
        const taggV=async(req,res,next)=>{
        const tagg=req.query.tagg.split(',')
        console.log(tagg)
            try{
             const taggv=await video.find({tagg:{$in:tagg}}).limit(20)
             res.status(200).json(taggv)
            }catch(err){
            next(err)
            }
        }
        const trendV=async(req,res,next)=>{
                try{
                 const trendv=await video.find().sort({view:-1}).limit(1)
                 res.status(200).json(trendv)
                }catch(err){
                next(err)
                }
            }
            const createcommentV=async(req,res,next)=>{
              
                try{
                    
                 const createcomment=await comments.create({
                    userID:req.params.id,
                    videoId:req.body.videoId,
                    content:req.body.content
                })
                const mycommenterinfo = await user.findById(req.params.id);
                 res.status(200).json({ ...mycommenterinfo._doc, ...createcomment._doc })
                }catch(err){
                next(err)
                }
            }   
            const getcommentV = async (req, res, next) => {
                console.log(req.params.id)
                try {
                    const getcomment = await comments.find({ videoId: req.params.id });
                    const mycommenterinfo = await Promise.all(
                        getcomment.map(async (x) => {
                            const userInfo = await user.findById(x.userID); // await the user find call
                            return { ...x._doc, ...userInfo._doc }; // Merge the documents properly
                        })
                    );
                    res.status(200).json(mycommenterinfo);
                } catch (err) {
                    next(err);
                }
            };
            
module.exports={getoneV,getcommentV,createcommentV,trendV,randomV,taggV,createV,search,searchs,onechannelvideo,modifyV,deleteV,likeV,dislikeV,addview}