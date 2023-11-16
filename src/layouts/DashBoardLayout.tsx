import MyProfile from "../pages/MyProfile/MyProfile";


export default function DashBoardLayout() {
    const userData = sessionStorage.getItem('userData');
    const { email } = JSON.parse(userData as string);
    console.log(email)

    return (
        <div>
           {
            email==='rakibulhasan99445@gmail.com' ?
            <h1>ADMIN</h1>
             : <MyProfile />
           }
        </div>
    )
}
