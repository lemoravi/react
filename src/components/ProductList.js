// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        const user = JSON.parse(localStorage.getItem("user"));
        let result = await fetch('https://node-ii6z.onrender.com/products', {
            headers: {
                authorisation: user._id,
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
    };

    const deleteProduct = async (id) => {
        let result = await fetch(`https://node-ii6z.onrender.com/product/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result.deletedCount === 1) {
            getProducts();
        } else {
            alert("Failed to delete product.");
        }
    };

    const searchHandle = async (e) => {
        const key = e.target.value;
        setSearchTerm(key);

        if (key) {
            let result = await fetch(`https://node-ii6z.onrender.com/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if (result) setProducts(result);
        } else {
            getProducts();
        }
    };

    return (
        <div className="product-list-container">
            <h2>Product List</h2>
            <input
                type="text"
                placeholder="Search product"
                value={searchTerm}
                onChange={searchHandle}
                className="search-input"
            />
            {
                products.length > 0 ? (
                    <table className="product-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Company</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.category}</td>
                                    <td>{item.company}</td>
                                    <td>
                                        <button
                                            className="delete-btn"
                                            onClick={() => deleteProduct(item._id)}
                                        >
                                            Delete
                                        </button>
                                        <button
                                            className="edit-btn"
                                            onClick={() => navigate(`/update/${item._id}`)}
                                            style={{ marginLeft: '10px' }}
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No products found.</p>
                )
            }
        </div>
    );
};

export default ProductList;
