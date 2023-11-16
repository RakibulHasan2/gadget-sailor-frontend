import AdminProfile from "../pages/AdminProfile/AdminProfile";
import MyProfile from "../pages/MyProfile/MyProfile";


export default function DashBoardLayout() {
    const userData = sessionStorage.getItem('userData');
    const { email } = JSON.parse(userData as string);
    console.log(email)

    return (
        <div>
            {
                email === 'gadgetsailoradmin@gmail.com'
                    ?
                    <AdminProfile />
                    :
                    <MyProfile />
            }
        </div>
    )
}
