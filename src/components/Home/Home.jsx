import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import ProductCard from '../ProductCard/ProductCard';

export default function Home() {
    const [products, setProducts] = useState([])

    async function getProducts() {
        try {
            let { data } = await axios.get(`https://fakestoreapi.com/products`);
            console.log(data);
            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <div className='container'>
            <div className="row my-5 gy-5">
                {products.map(product =>
                    <ProductCard product={product} />
                )}
            </div>
        </div>
    )
}
