import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext';

export default function ProductDetails() {
    let { id } = useParams();
    const { addToCart } = useContext(CartContext);

    const [productDetails, setProductDetails] = useState()

    async function getProductdetails() {
        try {
            let { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
            console.log(data);
            setProductDetails(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProductdetails();
    }, [id])

    return (
        <div className="container my-5">
            <div className='row g-5'>
                <div className="col-md-4">
                    <img src={productDetails?.image} alt="" style={{ height: '400px', width: '100%' }} />
                </div>
                <div className="col-md-8">
                    <h1>{productDetails?.title}</h1>
                    <div className="d-flex justify-content-between fs-3">
                        <p className='text-success'>${productDetails?.price}</p>
                        <p>
                            <i className="fa fa-star text-warning"></i>
                            {productDetails?.rating.rate}
                        </p>
                    </div>
                    <p>{productDetails?.description}</p>
                    <span>Category: {productDetails?.category}</span>
                    <button
                        className="btn btn-primary d-block w-25 py-2 my-5"
                        onClick={() => addToCart(productDetails)} 
                    >
                        Add to Cart 
                    </button>
                </div>
            </div>
        </div>
    )
}
