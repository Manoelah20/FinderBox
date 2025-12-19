// C:/.../FinderBox/apps/web/src/components/PrivateRoute.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
// 🚨 Importe o useAuth do caminho correto:
import { useAuth } from '../context/AuthContext.tsx'; 

interface PrivateRouteProps {
    children: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    // 🚨 Use o hook de autenticação para verificar o estado
    const { isAuthenticated, loading } = useAuth(); 

    if (loading) {
        // Exibir um spinner ou componente de carregamento
        return <div>Carregando autenticação...</div>;
    }

    if (!isAuthenticated) {
        // Redireciona para a página de login se não estiver autenticado
        return <Navigate to="/login" replace />;
    }

    // Renderiza a rota filha se estiver autenticado
    return children;
};

export default PrivateRoute;