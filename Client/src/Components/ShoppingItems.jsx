import React, { useEffect, useState } from 'react';
import testImg from '../Assets/tempImg.jpg';
import axios from 'axios';

const ShoppingItems = ({ night, addItems, product }) => {
    const API = 'http://localhost:8080/items';
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(API)
            .then((res) => {
                setData(Array.isArray(res.data) ? res.data : []);
                setLoading(false); // Set loading to false after data is fetched
            })
            .catch((err) => {
                console.log(err.message);
                setLoading(false); // In case of an error, stop loading
            });
    }, []);

    const handleItemDelete = (id) => {
        axios.delete(`${API}/item-remove/${id}`);
    }

    return (
        <>
            {
                loading ? (<h1>Loading...</h1>) :
                    (data.length <= 0
                        ? <h1 className='d-flex gap-3 align-items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="#e8c546" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                            No items available try to add items in the store
                        </h1>
                        : data.map((item) => (
                            <div key={item._id} className="card" style={{ width: "18rem" }}>
                                <img src={item.image} className="card-img-top" alt="..." />
                                <div className={`card-body ${night ? 'bg-dark' : ''}`}>
                                    <h5 className="card-title">{item.name}</h5>
                                    <p className="card-text">{item.description}</p>
                                    <p className="card-text"> ₹{item.price}</p>

                                    <span className="btn btn-primary" onClick={() => addItems([...product, item])}>Add to Cart</span>

                                    <button className='border btn mx-2' onClick={() => handleItemDelete(item._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                        </svg>
                                    </button>
                                    <button className='border btn mx-2'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )))
            }
        </>
    );
}

export default ShoppingItems;
