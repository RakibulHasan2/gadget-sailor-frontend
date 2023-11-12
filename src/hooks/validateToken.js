export const validateUserToken = (email) => {
    if (email) {
        fetch(`http://localhost:5000/api/v1/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.accessToken) {
                    sessionStorage.setItem('accessToken', data.accessToken)
                    return data.accessToken;
                }
                return false;
            });   
    }
}