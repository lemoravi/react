// src/components/ResetPassword.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { token } = useParams();
    const navigate = useNavigate();

    const handleReset = async () => {
        const result = await fetch(`https://node-ii6z.onrender.com/reset-password/${token}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        const data = await result.json();
        setMessage(data.message);

        if (data.message === "Password has been reset successfully") {
            setTimeout(() => navigate("/login"), 2000);
        }
    };

    return (
        <div className="reset-password">
            <h2>Reset Password</h2>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter new password" />
            <button onClick={handleReset}>Reset Password</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ResetPassword;
