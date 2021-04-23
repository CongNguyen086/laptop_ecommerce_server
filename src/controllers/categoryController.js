import { categoryService } from "../services";

export const getAllCategory = async (req, res) => {
  try {
    const categoryList = await categoryService.getAllCategory();
    return res.status(200).json(categoryList);
  } catch (error) {
    throw new Error(error);
  }
}