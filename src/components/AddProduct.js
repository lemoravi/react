// src/components/AddProduct.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState('');

    const userId = JSON.parse(localStorage.getItem('user'))?._id;
    const navigate = useNavigate();

    const addProduct = async () => {
        if (!name || !price || !category || !company) {
            setError('Please fill all fields');
            return;
        }

        const result = await fetch('https://node-ii6z.onrender.com/add-product', {
            method: 'POST',
            body: JSON.stringify({ name, price, category, userId, company }),
            headers: {
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        const data = await result.json();
        console.log(data);
        alert('Product added successfully');

        setName('');
        setPrice('');
        setCategory('');
        setCompany('');
        setError('');
        navigate('/');
    };

    return (
        <div className="add-product-container">
            <h3>Add Product</h3>
            <input
                className="inputBox"
                type="text"
                placeholder="Enter product name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="Enter price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            />
            <input
                className="inputBox"
                type="text"
                placeholder="Enter company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <button onClick={addProduct} className="appButton" type="button">
                Add Product
            </button>
            {error && <p>{error}</p>}
        </div>
    );
};

export default AddProduct;
