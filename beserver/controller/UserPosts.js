import jwt from "jsonwebtoken";
import { Post } from "../modals/Postmodal.js";

const secretKey = "$2b$10$AdmfXaD4DGnYSrTEX9HArO.";

const UserPosts = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized token" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.id;
    const userItems = await Post.findAll({
      where: {
        UserId: userId,
      },
    });

    if (userItems.length!=0) {
        return res.status(200).json({"message":"UserPosts :",userItems });
    } else {
      res.send({ message: "No posts found on this UserId " });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default UserPosts;