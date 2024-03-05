import { Post } from "../modals/Postmodal.js";

export const viewcontroller=async(req,res)=>{
    const {id} = req.params || {};
     const userViews = await Post.findOne({ where: { PostId: id} });
     if(userViews === null){
        res.send({"message":"Views aren't updated because there is no item with the current product id"})
     }
     else{
        const userViews = await Post.findOne({ where: { PostId: id} });
        const {Views}=userViews.dataValues;
        console.log(Views)
            await Post.update({Views:Views+1},{
                where:{
                    PostId:id
                }
            })
            res.send({"message":"Views updated"})
     }
}