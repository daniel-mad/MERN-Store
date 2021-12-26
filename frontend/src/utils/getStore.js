import axios from 'axios';
export const getStore = async () => {
  try {
    let res;
    res = await axios.get('/brands');
    const brands = await res.data;
    res = await axios.get('/categories');
    const categories = await res.data;
    res = await axios.get('/colors');
    const colors = await res.data;
    res = await axios.get('/productfits');
    const productfits = await res.data;
    res = await axios.get('/sizes');
    const sizes = await res.data;
    res = await axios.get('/products');
    const products = await res.data;
    return { brands, categories, colors, productfits, sizes, products };
  } catch (error) {
    console.log(error);
  }
};
