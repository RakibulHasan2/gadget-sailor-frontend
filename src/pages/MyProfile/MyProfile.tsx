

export default function MyProfile() {

    const userData = sessionStorage.getItem('userData');
    const user = JSON.parse(userData as string);
    console.log(user.division)
    return (
        <div>
            <div className="avatar">
                <div className="w-24 rounded-full">
                    <img src={user.image} />

                </div>
            </div>
            <p>{user.name.firstName} {user.name.lastName}</p>
            <p>{user.email}</p>
            <p>{user.division}</p>
            <p>{user.city}</p>
            <p>{user.post_code}</p>
        </div>
    )
}
