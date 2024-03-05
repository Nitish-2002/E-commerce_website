import { Category } from "../modals/Categoriesmodel.js";

export const addCategoryName = async (req, res) => {
    try {
        // Input validation
        const { categoryName } = req.body;
      
        const existingaCategory = await Category.findOne({
            where: {
                categoryName: categoryName
            },
          });

        // Create category

        if(!existingaCategory){
            const addName = await Category.create({ categoryName });
            res.status(201).json({ message: `Added category name: ${categoryName}`, data: addName });
           
        }else{
            res.status(401).json({ message: `Added category name already exists: ${categoryName}` });
        }
        
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ error: "Error uploading category name." });
    }
};
