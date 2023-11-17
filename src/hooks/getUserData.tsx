
export const userData = () => {
    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData as string);
    return user
}