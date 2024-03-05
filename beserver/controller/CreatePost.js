 import jwt from "jsonwebtoken";
import { Post } from "../modals/Postmodal.js";
import sharp from "sharp";

const createPost = async (req, res) => {
    try {
        const secretKey = "$2b$10$AdmfXaD4DGnYSrTEX9HArO.";
        const token = req.headers.authorization?.split(" ")[1];
        console.log(req.headers.authorization);
        console.log("it is connected");
        console.log("lIne 11 "+token)
        if (!(req.headers.authorization)) {
            console.log("sweety")
            return res.status(401).json({ message: "Unauthorized token" });
        }
        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: 'Invalid token' });
            }
            const { Title, Description, Address, date, Price, Category, ProductImage } = req.body;
            const Status="active"
            // Validate the Status field
            // const validStatusOptions = ['active', 'inactive'];
            // if (!validStatusOptions.includes(Status)) {
            //     return res.status(400).json({ message: 'Invalid +. Choose either "active" or "inactive".' });
            // }

            // Validate the Category field
            // const validCategoryOptions = ['Electronics', 'Automobile', 'Grocery', 'Furniture'];
            // if (!validCategoryOptions.includes(Category)) {
            //     return res.status(400).json({ message: 'Invalid Category. Choose from "Electronics", "Automobile", "Grocery", "Furniture."' });
            // }

            //  base64 image to a buffer
            const buffer = Buffer.from(ProductImage, "base64");

            // sharp to process the image (resize, format...)
            const processedImage = await sharp(buffer)
                .toFormat("jpeg") 
                .toBuffer();

            // Define the filename and filepath
            const timestamp = Date.now();
            const FileName = `images_${timestamp}_${Title.replace(/\s/g, '_').toLowerCase()}.jpg`;
            const filePath = `images/${FileName}`;

            // Save the processed image
            await sharp(processedImage).toFile(filePath);

            //  new post with file details
            const newPost = await Post.create({
                Title,
                Description,
                Address,
                date,
                Price,
                Status,
                Category,
                UserId: decoded.id,
                FileName,
            });

            res.json({ message: 'Post created successfully!', newPost });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default createPost;
