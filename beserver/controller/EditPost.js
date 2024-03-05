// import jwt from 'jsonwebtoken';
// import { Post } from "../modals/Postmodal.js";

// const secretKey = "$2b$10$AdmfXaD4DGnYSrTEX9HArO.";

// const editPost = async (req, res) => {
//     const token = req.headers.authorization?.split(' ')[1];

//     if (!token) {
//         return res.status(401).json({ message: "Unauthorized token" });
//     }

//     try {
//         const decoded = jwt.verify(token, secretKey);
//         const userId = decoded.id;
//         const {id}=req.params
//         const product = await Post.findOne({
//             where: {
//                 PostId: id,
//                 // UserId: userId,
//             }
//         });

//         // if (!product) {
//         //     return res.json("Post not found with the user");
//         // }

//         // await Post.update(req.body,{where:{UserId:userId, PostId:id}});

//         // return res.json("Product updated");

//         if (product) {
//             if(product.UserId!==userId){
//                 return res.json("Access denied for this user to edit this product");
//             }
//             else{
//                 const buffer = Buffer.from(product.ProductImage, "base64");

//                 // sharp to process the image (resize, format...)
//                 const processedImage = await sharp(buffer)
//                     .toFormat("jpeg") 
//                     .toBuffer();
    
//                 // Define the filename and filepath
//                 const timestamp = Date.now();
//                 const FileName = `images_${timestamp}_${Title.replace(/\s/g, '_').toLowerCase()}.jpg`;
//                 const filePath = `images/${FileName}`;
    
//                 // Save the processed image
//                 await sharp(processedImage).toFile(filePath);

//                 await Post.update(req.body,{

//                     where: {
//                         PostId: id,
//                         UserId: userId,
//                     }
//                 });
              
//                 return res.json("Product updated successfully");
//             }
            
//         }
//         else{
//             return res.json("Product not found with this product id");
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(401).json({ message: "Invalid token" });
//     }
// };

// export default editPost;




import jwt from 'jsonwebtoken';
import sharp from 'sharp'; // Make sure to import sharp library

import { Post } from '../modals/Postmodal.js';

const secretKey = "$2b$10$AdmfXaD4DGnYSrTEX9HArO.";

const editPost = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized token" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        const userId = decoded.id;
        const { id } = req.params;
        const { Title, ProductImage,   Description, Address, date, Price, Status, Category } = req.body;

        const post = await Post.findOne({
            where: {
                PostId: id,
            },
        });

        if (!post) {
            return res.json("Post not found with the given id");
        }

        if (post.UserId !== userId) {
            return res.json("Access denied for this user to edit this post");
        }

        // Process and save the new image if ProductImage is provided
        if (ProductImage) {
            const buffer = Buffer.from(ProductImage, "base64");

            // sharp to process the image (resize, format...)
            const processedImage = await sharp(buffer)
                .toFormat("jpeg")
                .toBuffer();

            // Define the filename and filepath
            const timestamp = Date.now();
            const fileName = `images_${timestamp}_${Title.replace(/\s/g, '_').toLowerCase()}.jpg`;
            const filePath = `images/${fileName}`;

            // Save the processed image
            await sharp(processedImage).toFile(filePath);


            await post.update({
                Title,
                FileName: fileName, 
                Description,
                Address,
                date,
                Price,
                Status,
                Category
            });
        } else {
            await post.update({
                Title,
                Description,
                Address,
                date,
                Price,
                Status,
                Category
            });
        }

        return res.json("Post updated successfully");
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default editPost;
