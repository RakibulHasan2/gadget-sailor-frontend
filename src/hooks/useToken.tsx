import { useEffect, useState } from 'react';
import { baseUrl } from '../routes/Routes';
export const useToken = (email: string) => {
    const [token, setToken] = useState('')
    useEffect(() => {
        if (email) {
            fetch(`${baseUrl}/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.accessToken) {
                        sessionStorage.setItem('accessToken', data.accessToken)
                        setToken(data.accessToken)
                    }
                });
        }
    }, [email])
    return [token];
}

