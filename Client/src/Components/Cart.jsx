import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ product, addItems }) => {
    const [totalCost, setTotalCost] = useState(0);
    const navigate = useNavigate();

    // Recalculate totalCost whenever product changes
    useEffect(() => {
        const total = product.reduce((acc, item) => acc + item.price, 0);
        setTotalCost(total);
    }, [product]);

    // Handle removing item (removes first occurrence)
    const handleRemove = (itemToRemove) => {
        const indexToRemove = product.findIndex((item) => item._id === itemToRemove._id);
        if (indexToRemove !== -1) {
            const newItems = [...product];
            newItems.splice(indexToRemove, 1); // remove one item
            addItems(newItems);
        }
    };

    // Handle adding same item again
    const handleAdd = (itemToAdd) => {
        addItems([...product, itemToAdd]);
    };

    const handlePayment = () => {
        if (product.length > 0) {
            alert('Thanks for Shopping, your items will be delivered to you.');
        }
        else {
            navigate('/');
        }
    }

    return (
        <div>
            <h1 className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" fill="currentColor" className="bi bi-cart4 mx-1" viewBox="0 0 16 16">
                    <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                </svg>
                ₹{totalCost}
                {/* My Cart */}
            </h1>

            <div className="d-flex flex-column justify-content-center align-items-center">
                {product.map((item, i) => (
                    <div key={i} className="my-4">
                        <div className="card mb-3" style={{ maxWidth: "800px", minHeight: "200px" }}>
                            <div className="row g-0">
                                <div className="col-md-4">
                                    <img src={item.image} className="img-fluid rounded-start" alt="..." />
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body" style={{ flexGrow: 1 }}>
                                        <h5 className="card-title">{item.name}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <p className="card-text"><small className="text-body-secondary">₹{item.price}</small></p>
                                        <button className="btn border" onClick={() => handleAdd(item)}>+</button>
                                        <button className="btn border mx-2" onClick={() => handleRemove(item)}>-</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="d-flex justify-content-center align-items-center" style={{ height: "5vh" }}>
                <button className="btn btn-success" onClick={handlePayment}>
                    {product.length ? 'Pay Now'
                        : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart-plus" viewBox="0 0 16 16">
                            <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9z" />
                            <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>}
                </button>
            </div>
        </div>
    );
};

export default Cart;
