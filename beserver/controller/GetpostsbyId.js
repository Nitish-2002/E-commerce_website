// import { posts } from "../Models/user";
import { Post } from "../modals/Postmodal.js";

 const getpostsbyid = async (req, res) => {
const{id}=req.params;
 const data = await Post.findAll({
    where:{
        PostId:id,
    }
 });
  const allposts = data.map((each) => {
    return each.dataValues;
  });
  res.send(allposts)
}

export default getpostsbyid;