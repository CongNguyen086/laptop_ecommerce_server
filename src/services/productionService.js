import queryBuilder from "../config/db.js";
import { FilterType } from "../constant/common.js";

const getAllColor = async () => {
  try {
    const colorList = await queryBuilder.select('*').from('color');
    return colorList;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllRam = async () => {
  try {
    const ramList = await queryBuilder.select('*').from('ram');
    return ramList;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllBrand = async () => {
  try {
    const brandList = await queryBuilder.select('*').from('brand');
    return brandList;
  } catch (error) {
    throw new Error(error);
  }
};

const getFilterOptions = async () => {
  try {
    const [
      colorList,
      ramList,
      brandList,
    ] = await Promise.all([
      getAllColor(),
      getAllRam(),
      getAllBrand(),
    ]);
    const colorOptions = {
      type: FilterType.COLOR,
      options: colorList
    };
    const ramOptions = {
      type: FilterType.RAM,
      options: colorList
    };
    const brandOptions = {
      type: FilterType.BRAND,
      options: colorList
    };
    return [
      colorOptions,
      ramOptions,
      brandOptions,
    ];
  } catch (error) {
    throw new Error(error);
  }
};

export {
  getAllColor,
  getAllRam,
  getAllBrand,
  getFilterOptions,
};