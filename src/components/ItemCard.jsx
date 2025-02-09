import { useState } from 'react'

function ItemCard({ item, onUpdatePrice, onDelete }) {
    const [newPrice, setNewPrice] = useState("");
    const [showInput, setShowInput] = useState(false);

    const handleUpdatePrice = () => {
        const price = parseFloat(newPrice);
        if (!isNaN(price)) {
            onUpdatePrice(item.id, price);
            setNewPrice("");
            setShowInput(false);
        }
    };

    return (
        <div className="card h-100">
            <div className="card-body text-center">
                <div
                    className="bg-secondary rounded mb-3"
                    style={{ width: "fit-content", height: "fit-content", display: "flex", alignItems: "center", justifyContent: "center" }}
                >
                    {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.title} className="img-fluid" style={{ width: "400px", height: "230px", borderRadius: "3px" }} />
                    ) : (
                        <span className="text-light">No Image</span>
                    )}
                </div>
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-success">${item.price}</p>
                {showInput && ( 
                    <input
                        type="number"
                        placeholder="New Price"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="form-control mb-2"
                    />
                )}
                {showInput ? (
                    <button
                        onClick={handleUpdatePrice}
                        className="btn btn-primary btn-block w-100 mb-2"
                    >
                        Update Price
                    </button>
                ) : (
                    <button
                        onClick={() => setShowInput(true)}
                        className="btn btn-primary btn-block w-100 mb-2"
                    >
                        Update Price
                    </button>
                )}
                <button
                    onClick={() => onDelete(item.id)}
                    className="btn btn-danger btn-block w-100"
                >
                    Delete Item
                </button>
            </div>
        </div>
    )
}

export default ItemCard;