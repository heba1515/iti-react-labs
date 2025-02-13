import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import styes from './Cart.module.css'

export default function Cart() {
    const { cart, removeFromCart, updateQuantity } = useContext(CartContext);

    const totalPrice = cart.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);

    return (
        <div className="container my-5">
            <h2>Shopping Cart</h2>
            {cart.length === 0 ? (
                <div className="d-flex justify-content-center align-items-center text-secondary" style={{ height: '200px' }}>
                    <p>Cart is empty.</p>
                </div>
            ) : (
                <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((product) => (
                                <tr key={product.id}>
                                    <td><img src={product.image} alt={product.title} style={{ width: "50px" }} /></td>
                                    <td>{product.title}</td>
                                    <td>${(product.price * product.quantity).toFixed(2)}</td>
                                    <td>
                                        <input
                                            type="number"
                                            value={product.quantity}
                                            onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                                            min="1"
                                            className="form-control"
                                            style={{ width: "60px" }}
                                        />
                                    </td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => removeFromCart(product.id)}>
                                            <i class="fa-solid fa-xmark"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-between align-items-center px-4 pt-3">
                        <h4 className="fw-bold">Total Price:</h4>
                        <h4 className="fw-bold">${totalPrice}</h4>
                    </div>
                </>
            )}
        </div>
    );
}
