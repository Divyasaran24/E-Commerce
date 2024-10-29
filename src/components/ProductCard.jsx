// src/components/ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    return (
        <div className="product-card" onClick={() => navigate(`/product/${product.id}`)}>
            <img src={product.thumbnail} alt={product.title} />
            <h3>{product.title}</h3>
            <p className="price">Price: ${product.price}</p>
            <p>Category: {product.category}</p>
            <p>Discount: {product.discountPercentage}%</p>
            <p>Rating: {product.rating}</p>
            <p>{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</p>
        </div>
    );
};

export default ProductCard;
