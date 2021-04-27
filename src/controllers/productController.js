import { productService } from '../services';

export const getFilterOptions = async (req, res) => {
  try {
    const filterList = await productService.getFilterOptions();
    return res.status(200).json(filterList);
  } catch (error) {
    throw new Error(error);
  }
}

export const findProductByFilter = async (req, res) => {
  try {
    const { categoryId } = req.params;
    console.log("🚀 ~ file: productController.js ~ line 15 ~ findProductByFilter ~ req.params", req.params)
    console.log("🚀 ~ file: productController.js ~ line 17 ~ findProductByFilter ~ req.body", req.body)
    const { filterOptions } = req.body;
    const productList = await productService.findProductByCondition({
      categoryId,
      filterOptions,
    });
    console.log("🚀 ~ file: productController.js ~ line 20 ~ findProductByFilter ~ productList", productList);
    return res.status(200).json(filterList);
  } catch (error) {
    throw new Error(error);
  }
};