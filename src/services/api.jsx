import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

//?  fetch Products function
const fetchProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.products;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw new Error('Failed to fetch products');
    }
};

//? fetch Product Details function
const fetchProductDetails = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return response.data; 
    } catch (error) {
        console.error('Error fetching product details:', error);
        throw new Error('Failed to fetch product details'); 
    }
};

//? object to hold API methods 
const ApiService = {
    fetchProducts,
    fetchProductDetails,
};

export default ApiService;