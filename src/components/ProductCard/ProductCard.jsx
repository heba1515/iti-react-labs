import React from 'react'
import styles from './ProductCard.module.css'

export default function ProductCard({product}) {

    function cssClasses(...classes){
        return classes.join(" ");
    } 

    return (
        <div key={product.id} className="col-md-4">
            <div className="card h-100">
                <div className="card-body text-center">
                    <div
                        className="bg-secondary rounded mb-3"
                        style={{ width: "fit-content", height: "fit-content", display: "flex", alignItems: "center", justifyContent: "center" }}
                    >
                        {product.image ? (
                            <img src={product.image} alt={product.title} className="img-fluid" style={{ width: "400px", height: "230px", borderRadius: "3px" }} />
                        ) : (
                            <span className="text-light">No Image</span>
                        )}
                    </div>
                    <h5 className={cssClasses(styles.title)}>{product.title}</h5>
                    <div className="d-flex justify-content-between">
                        <p className="card-text text-success">${product.price}</p>
                        <p className="card-text">
                            <i className='fa fa-star text-warning'></i>
                            {product.rating.rate}
                        </p>
                    </div>
                    {/* <p className='card-text small'>{product.description.split(" ").splice(0, 10).join(" ")}...</p> */}
                </div>
            </div>
        </div>
    )
}
