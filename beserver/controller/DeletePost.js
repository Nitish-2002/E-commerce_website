import jwt from 'jsonwebtoken';
import { Post } from "../modals/Postmodal.js";

const secretKey = "$2b$10$AdmfXaD4DGnYSrTEX9HArO.";

const deletePost = async (req, res) => {
    const { Title } = req.body;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized token" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.id;
        const {id}=req.params;
        const product = await Post.findOne({ 
            where: {
                // PostId: req.body.PostId,
                PostId: id
                // UserId: userId,
            }
        });
       

        if (product) {
            if(product.UserId!==userId){
                return res.json("Access denied for this user to delete this product");
            }
            else{
                await Post.destroy({
                    where: {
                        PostId: id,
                        UserId: userId,
                    }
                });
        
                return res.json("Product deleted successfully");
            }
            
        }
        else{
            return res.json("Product not found with this product id");
        }
       

       
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default deletePost;