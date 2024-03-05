import { Post } from "../modals/Postmodal.js";

 const getallposts = async (req, res) => {
 const data = await Post.findAll();
 console.log(data)
  const allposts = data.map((each) => {
    return each.dataValues;
  });
  res.send(allposts)
}

export default getallposts