import { Post } from "../modals/Postmodal.js";

export const categoryController =async (req,res)=>{
const {category}=req.params;
const categoryItems= await Post.findAll({
    where: {
      Category: category
    }
  });
if(categoryItems!=null){
    res.send(categoryItems)
}
else{
    res.send({"message":"no elements found in this category"})
}
}