import React, { useEffect, useState } from 'react'
import ApiService from '../services/api';
import ProductCard from './ProductCard';

const ProductList = () => {

    const [products,setProducts] = useState([]);
    const [loading,setLoading] = useState(true);
    const [eroor,setError] = useState(null);

    useEffect(() => {
        const getProducts = async() => {
            try{
                const productData = await ApiService.fetchProducts();
                setProducts(productData);
            } catch(error){
                setError(error.message);
            }finally{
                setLoading(false);
            }
        };
        getProducts();
    },[]);

    if(loading) return <p>Loading...</p>;
    if(eroor) return <p>Error: {error}</p>;

  return (
    <div className="product-list"> 
        {products.map(product => (
            <ProductCard key={product.id} product={product} />
        ))}
    </div>
  )
}

export default ProductList;