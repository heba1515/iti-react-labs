import React from "react";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="col-md-3 col-sm-6 mb-4">
            <div className={`card h-100 shadow-sm border-0 ${styles.cardHover}`}>
                <Link
                    to={`/product-details/${product.id}`}
                    className="text-decoration-none text-dark"
                >
                    <div className="card-body text-center p-3">
                        <div
                            className="bg-light d-flex align-items-center justify-content-center rounded mb-3"
                            style={{
                                height: "230px",
                                overflow: "hidden",
                                borderRadius: "5px",
                            }}
                        >
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="img-fluid"
                                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                                />
                            ) : (
                                <span className="text-muted">No Image Available</span>
                            )}
                        </div>

                        <h6 className={`fw-bold text-truncate ${styles.title}`} title={product.title}>
                            {product.title}
                        </h6>

                        <div className="d-flex justify-content-between align-items-center mt-2">
                            <p className="mb-0 text-success fw-bold">${product.price}</p>
                            <p className="mb-0 text-muted small">
                                <i className="fa fa-star text-warning"></i>{" "}
                                {product.rating?.rate}
                            </p>
                        </div>
                    </div>
                </Link>

                <button
                    className="btn btn-primary w-100 py-2"
                    onClick={(e) => {
                        e.preventDefault(); 
                        onAddToCart(product);
                    }}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
