// Импорт библиотек и данных
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hook/useAuth';
import { useEffect } from 'react';

const RequireNoAuth = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    if (user) {
        return navigate(-1);
    }

    return children;
};

export { RequireNoAuth };
