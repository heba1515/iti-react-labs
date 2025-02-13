import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import styles from './Home.module.css';
import ProductCard from '../ProductCard/ProductCard';
import { CartContext } from '../../Context/CartContext';

export default function Home() {
    const { addToCart } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProducts, setFilteredProducts] = useState([]);
    
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8; 

    async function getProducts() {
        try {
            let { data } = await axios.get(`https://fakestoreapi.com/products`);
            setProducts(data);
            setFilteredProducts(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getCategories() {
        try {
            let { data } = await axios.get(`https://fakestoreapi.com/products/categories`);
            setCategories(data);
        } catch (error) {
            console.log(error);
        }
    }

    async function getProductsByCategory(category) {
        try {
            let { data } = await axios.get(`https://fakestoreapi.com/products/category/${category}`);
            setFilteredProducts(data);
            setCurrentPage(1); 
        } catch (error) {
            console.log(error);
        }
    }

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        if (category === 'all') {
            setFilteredProducts(products);
        } else {
            getProductsByCategory(category);
        }
        setCurrentPage(1);
    };

    useEffect(() => {
        getProducts();
        getCategories();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    return (
        <div className='container'>
            <div className="row my-5 gx-1 text-center">
                <div className="col">
                    <button
                        className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                        onClick={() => handleCategoryClick('all')}
                    >
                        All
                    </button>
                </div>
                {categories.map((category, index) => (
                    <div className="col" key={index}>
                        <button
                            className={`btn ${selectedCategory === category ? 'btn-primary' : 'btn-outline-primary'}`}
                            onClick={() => handleCategoryClick(category)}
                        >
                            {category}
                        </button>
                    </div>
                ))}
            </div>

            <div className="row gy-5">
                {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                        <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                    ))
                ) : (
                    <p className="text-center text-secondary">No products found.</p>
                )}
            </div>

            <div className="d-flex justify-content-center my-5">
                <button 
                    className="btn btn-outline-primary mx-2" 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                >
                    Prev
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                    <button 
                        key={i + 1} 
                        className={`btn mx-1 ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`} 
                        onClick={() => setCurrentPage(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}

                <button 
                    className="btn btn-outline-primary mx-2" 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
