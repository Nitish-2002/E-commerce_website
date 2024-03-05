import { Category } from "../modals/Categoriesmodel.js";


export const getAllCategoryNames =async (req, res) => {
    const data = await Category.findAll();
    res.send(data)
}
