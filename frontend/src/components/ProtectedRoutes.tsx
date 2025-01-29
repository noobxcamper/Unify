import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router'
import { jwtDecode } from 'jwt-decode'
import API, { ACCESS_TOKEN, REFRESH_TOKEN, AUTHORIZED } from '../api'
import { Container, Skeleton } from '@mui/material';

function ProtectedRoutes({ children }) {
    const [authorized, setAuthorized] = useState<Boolean>(false);

    useEffect(() => {
        auth()
            .catch((error) => {
                console.error(error);
                setAuthorized(false);
            });
    }, [])

    const refreshToken = async () => {
        const token = localStorage.getItem(REFRESH_TOKEN);

        try {
            const response = await API.post("/user/token/refresh", { refresh: token });

            if (response.status === 200) {
                setAuthorized(true);
                localStorage.setItem(ACCESS_TOKEN, response.data.access);
            }
            else {
                setAuthorized(false);
            }
        }
        catch (error) {
            console.error(error);
            setAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)

        if (!token) {
            setAuthorized(false);
            return;
        }

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration! < now) {
            await refreshToken();
        } else {
            setAuthorized(true);
        }
    };

    if (authorized === null) {
        return (
            <>
                <Container>
                    <Skeleton variant='rounded' height={230} />
                </Container>
            </>
        )
    }

    return authorized ? children : <Navigate to="/login" />
}

export default ProtectedRoutes