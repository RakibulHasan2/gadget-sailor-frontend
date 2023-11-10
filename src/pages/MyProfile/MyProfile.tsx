


export default function MyProfile() {
const userData = sessionStorage.getItem('userData')
const user  = JSON.parse(userData as string)
console.log(user)
  return (
    <div>
      <h1>this is my profile</h1>
      <h1>this is my profile{user.name.firstName}</h1>
    </div>
  )
}
