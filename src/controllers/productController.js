import { productService } from '../services';

export const getFilterOptions = async (req, res) => {
  const filterList = await productService.getFilterOptions();
  return res.status(200).json(filterList);
}

export const findProductByFilter = async (req, res) => {
  const { categoryId } = req.params;
  const { filterOptions } = req.body;
  const productList = await productService.findProductByCondition({
    categoryId,
    filterOptions,
  });
  return res.status(200).json(productList);
};