import { useEffect, useState } from 'react';
const useToken = (email: string) => {
    const [token, setToken] = useState('')
    useEffect(() => {
        if (email) {
            fetch(`http://localhost:5000/api/v1/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.accessToken) {
                        sessionStorage.setItem('accessToken', data.accessToken)
                        setToken(data.accessToken)
                    }
                });
        }
    }, [email])
    return [token]
}
export default useToken;