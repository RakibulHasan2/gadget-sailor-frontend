import { useEffect, useState } from 'react';
export const useToken = (email: string) => {
      const [token, setToken] = useState('')
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/api/v1/jwt?email=${email}`)
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
    return token;
}
