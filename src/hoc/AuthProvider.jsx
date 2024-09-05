import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        var url = 'https://melodymind.tw1.ru/config/config.php';
        var headers = {
            Accept: 'application/json',
            'Conten-Type': 'application/json',
        };
        fetch(url, {
            method: 'POST',
            headers: headers,
        })
            .then((response) => response.json())
            .then((response) => {
                setUser(response[0]);
            })
            .catch(() => {});
    });

    const value = { user };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
