import queryBuilder from "../config/db.js";

const getAllCategory = async () => {
  try {
    const category = await queryBuilder.select('*').from('category');
    return category;
  } catch (error) {
    throw new Error(error);
  }
}

export {
  getAllCategory,
};