import queryBuilder from "../config/db.js";
import { FilterTypes } from "../constant/common.js";
import { RamFilterOptions, StorageFilterOptions as CameraFilterOptions } from "../constant/filterOptions.js";

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
    const ramFilterList = RamFilterOptions.map((item) => ({
      label: item.label,
      type: item.type,
      values: [],
    }));
    ramList.forEach((item) => {
      const ramObject = RamFilterOptions.find((option) => option.values.includes(item.memory));
      const ramIndex = ramFilterList.findIndex((filterItem) => filterItem.label === ramObject.label);
      ramFilterList[ramIndex].values.push(item.id);
    });
    return ramFilterList;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllBrand = async () => {
  try {
    const brandList = await queryBuilder.select('*').from('brand');
    return brandList.map((brand) => ({
      label: brand.label,
      values: [brand.id],
      type: FilterTypes.BRAND,
    }));
  } catch (error) {
    throw new Error(error);
  }
};

const getAllStorage = async () => {
  try {
    const storageList = await queryBuilder.select('*').from('storage');
    const storageFilterList = CameraFilterOptions.map((item) => ({
      label: item.label,
      type: item.type,
      values: [],
    }));
    storageList.forEach((item) => {
      const storageObject = CameraFilterOptions.find((option) => option.values.includes(item.size));
      const storageIndex = storageFilterList.findIndex((filterItem) => filterItem.label === storageObject.label);
      storageFilterList[storageIndex].values.push(item.id);
    });
    return storageFilterList;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllCamera = async () => {
  try {
    const cameraList = await queryBuilder.select('*').from('camera');
    return cameraList.map((camera) => ({
      label: camera.label,
      values: [camera.id],
      type: FilterTypes.CAMERA,
    }));
  } catch (error) {
    throw new Error(error);
  }
};

const getAllSpecialFeature = async () => {
  try {
    const featureList = await queryBuilder.select('*').from('special_feature');
    return featureList.map((feature) => ({
      label: feature.label,
      values: [feature.id],
      type: FilterTypes.SPECIAL_FEATURE,
    }));
  } catch (error) {
    throw new Error(error);
  }
};

const getAllAvailability = async () => {
  try {
    return [
      {
        label: 'In store',
        values: [true],
        type: FilterTypes.AVAILABILITY,
      },
      {
        label: 'Out of stock',
        values: [false],
        type: FilterTypes.AVAILABILITY,
      },
    ];
  } catch (error) {
    throw new Error(error);
  }
};

const getFilterOptions = async () => {
  try {
    const [
      ramList,
      brandList,
      storageList,
      cameraList,
      featureList,
      availabilityList,
    ] = await Promise.all([
      getAllRam(),
      getAllBrand(),
      getAllStorage(),
      getAllCamera(),
      getAllSpecialFeature(),
      getAllAvailability(),
    ]);
    const ramOptions = {
      type: FilterTypes.RAM,
      data: ramList,
    };
    const brandOptions = {
      type: FilterTypes.BRAND,
      data: brandList,
    };
    const storageOptions = {
      type: FilterTypes.STORAGE,
      data: storageList,
    };
    const cameraOptions = {
      type: FilterTypes.CAMERA,
      data: cameraList,
    };
    const featureOptions = {
      type: FilterTypes.SPECIAL_FEATURE,
      data: featureList,
    };
    const availabilityOptions = {
      type: FilterTypes.AVAILABILITY,
      data: availabilityList,
    };
    return [
      ramOptions,
      brandOptions,
      storageOptions,
      cameraOptions,
      featureOptions,
      availabilityOptions,
    ];
  } catch (error) {
    throw new Error(error);
  }
};

const findProductByCondition = async ({ categoryId, filterOptions }) => {
  const data = await queryBuilder
    .select('*')
    .from('product')
    .where(builder => {
      if (categoryId) {
        builder.where('categoryId', categoryId);
      }
    })
    .andWhere(builder => {
      let rawCondition = '';
      for (const [key, value] of Object.entries(filterOptions)) {
        if (value.length) {
          rawCondition = rawCondition.concat(
            `OR (${key} IN (${value
              .map(_ => "?")
              .join(",")})) `
          )
        }
      }
      rawCondition = rawCondition.replace(/^(OR)/g, '').replace(/(OR)$/g, '');
      if (rawCondition) {
        builder.whereRaw(
          rawCondition,
          [...Object.values(filterOptions).flatMap((option) => option)]
        );
      }
    });
  return data;
}

export {
  getAllColor,
  getAllRam,
  getAllBrand,
  getFilterOptions,
  findProductByCondition,
};