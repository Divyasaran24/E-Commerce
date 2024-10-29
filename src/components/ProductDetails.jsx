import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApiService from '../services/api';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAdditionalDetails, setShowAdditionalDetails] = useState(false);

    useEffect(() => {
        const getProductDetails = async () => {
            try {
                const productData = await ApiService.fetchProductDetails(id);
                setProduct(productData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getProductDetails();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>No product found.</p>;

    return (
        <div className="product-details">
            <div className="product-details-container">
                <img src={product.thumbnail} alt={product.title} />
                <div className="product-details-content"> 
                    <button onClick={() => navigate('/')} >
                        Back to Home
                    </button>
                    <h2>{product.title}</h2>
                    <p><span>Category:</span> {product.category}</p>
                    <p><span>Brand:</span> {product.brand}</p>
                    <p className="price">Price:<span>${product.price}</span></p>
                    <p><span>Discount:</span> {product.discountPercentage}%</p>
                    <p><span>Rating:</span> {product.rating}</p>
                    <p><span>Stock:</span> {product.stock}</p>
                    <p><span>SKU:</span> {product.sku}</p>
                    <p><span>Tags:</span> {product.tags.join(', ')}</p>
                    <p><span>Description:</span> {product.description}</p>

                    {showAdditionalDetails && (
                        <div className="additional-details">
                            <p><span>Weight:</span> {product.weight || 'N/A'} kg</p>
                            <p>
                                <span>Dimensions:</span> 
                                Width: {product.dimensions.width} cm, 
                                Height: {product.dimensions.height} cm, 
                                Depth: {product.dimensions.depth} cm
                            </p>
                            <p><span>Warranty:</span> {product.warranty || 'N/A'}</p>
                            <p><span>Shipping Information:</span> {product.shipping || 'N/A'}</p>

                            {/* Render reviews only if additional details are shown */}
                            <h3>Reviews:</h3>
                            {product.reviews && product.reviews.length > 0 ? (
                                product.reviews.map((review, index) => (
                                    <div key={index}>
                                        <p><strong>{review.reviewerName}:</strong> {review.comment} (Rating: {review.rating})</p>
                                        <p>Date: {review.date}</p>
                                        <p>Email: {review.reviewerEmail}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No reviews available.</p>
                            )}
                        </div>
                    )}

                    <button onClick={() => setShowAdditionalDetails(!showAdditionalDetails)}>
                        {showAdditionalDetails ? 'Hide Details' : 'View Additional Details'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
