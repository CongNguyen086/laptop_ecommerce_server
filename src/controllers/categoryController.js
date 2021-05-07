import { categoryService } from "../services";

export const getAllCategory = async (req, res) => {
  const categoryList = await categoryService.getAllCategory();
  return res.status(200).json(categoryList);
}