import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoutes ({
    currentRole,
    allowedRoles,
    redirectPath ='/',
    children
}) {
        if (allowedRoles.includes(currentRole)) {
           return children;    
        }

         return <Navigate to={redirectPath} replace />;
    }

export default ProtectedRoutes
