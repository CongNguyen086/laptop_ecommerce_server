import { productService } from '../services';

export const getFilterOptions = async (req, res) => {
  try {
    const filterList = await productService.getFilterOptions();
    return res.status(200).json(filterList);
  } catch (error) {
    throw new Error(error);
  }
}