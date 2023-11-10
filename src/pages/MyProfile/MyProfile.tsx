


export default function MyProfile() {
    
const imageHostKey = '29473dd4ab78ebc95009722bc0558d38';
console.log(imageHostKey);
const userData = sessionStorage.getItem('userData')
const user  = JSON.parse(userData as string)
console.log(user)
  return (
    <div>
      <h1>this is my profile{user.email}</h1>
      <h1>this is my profile{user.name.firstame}</h1>
    </div>
  )
}
