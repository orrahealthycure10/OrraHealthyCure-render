import React, { useState } from 'react'
import '../componentStyles/Product.css';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product({ product }) {

    const [rating, setRating] = useState(0);
    const handleRatingChange = (newRating) => {
        setRating(rating)
        console.log(`Rating changed to : ${newRating}`);

    };


    return (

        <Link to={`/product/${product._id}`} className='product_id' >
            <div className="product-card">
                {product.images && product.images.length > 0 && (
                    <img src={product.images[0].url} alt={product.name} />
                )}
                <div className='product-details'>
                    <h3 className="product-title">{product.name}</h3>
                    <p className="home-price">
                        <strong >
                            Price:
                        </strong>{product.price}/-Rs
                    </p>
                    <div className="rating_container">
                        <Rating
                            value={product.ratings}
                            onRatingChange={handleRatingChange}
                            disabled={true}
                        />
                    </div>
                    <span className='productCardSpan'>
                        ({product.numOfReviews}{product.numOfReview === 1 ? "Review" : "Reviews"} )
                    </span>
                    <button className="add-to-cart">View Details</button>
               
                </div>
            </div>

        </Link>
    )
}

export default Product