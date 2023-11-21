import { useState } from "react";
import toast from "react-hot-toast";
import { userData } from "../../../hooks/getUserData";
import { IProduct } from "../../../types/ProductsType";
//import useApiData from "../../../hooks/getAPIData";


const LikeButton = ({ data }: IProduct) => {
    const [liked, setLiked] = useState(false);
    //const [likeCount, setLikeCount] = useState(0);
    const user = userData();
    //const { refetch } = useApiData(`http://localhost:5000/api/v1/getfav/${user.email}`);

    console.log(user)

    const handleLike = async () => {

        const favData = {
            product_name: data.product_name,
            model: data.model,
            price: data.price,
            image: data.image[0],
            email: user.email
        }
        console.log(favData)
        if (user) {
            if (liked) {
                setLiked(false)
                // setLikeCount(likeCount - 1)
                toast.error("Removed from your favourite list")
            }
            else {
                setLiked(true)
                // setLikeCount(likeCount + 1)

                const response = await fetch('http://localhost:5000/api/v1/addFav', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(favData),
                })
                if (response.ok) {
                    // Call refetch to update cart data after adding the item
                    toast.success("Added to your favourite list")
                    //refetch();
                }
                else {
                    toast.error("Couldn't add to your favurite");
                }

            }
        }
        else {
            alert('Please log in to add into the favourite.');
        }




    }


    return (
        <div>
            <button className="" title={liked ? "" : "add to favourite"}
                onClick={handleLike}
            >

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={liked ? "red" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>


        </div>
    );
};

export default LikeButton;