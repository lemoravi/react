// src/components/ForgotPassword.js
import React, { useState } from 'react';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async () => {
        const result = await fetch('https://node-ii6z.onrender.com/forgot-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });

        const data = await result.json();
        setMessage(data.message);
    };

    return (
        <div className="forgot-password">
            <h2>Forgot Password</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
            />
            <button onClick={handleSubmit}>Send Reset Link</button>
            {message && (
                <p className={message.includes("sent") ? "success" : "error"}>
                    {message}
                </p>
            )}
        </div>
    );
};

export default ForgotPassword;
