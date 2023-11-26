import { useState } from "react";
import toast from "react-hot-toast";
import { userData } from "../../../hooks/getUserData";
import { IProduct } from "../../../types/ProductsType";
import useFavData from "../../../hooks/getFavData";
import { FavDataType } from "../../../types/FavDataType";



const LikeButton = ({ info }: IProduct) => {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0)

    const user = userData();
    const { data, refetch } = useFavData(`http://localhost:5000/api/v1/getFav/${user.email}`);
    const likedData: FavDataType | undefined = data.find((item) => item.product_name === info.product_name)

    const handleLike = () => {
        if (liked && count === 1) {
            setLiked(false)
            setCount(count - 1)
        }
        else if (likedData?.count === 0) {
            setLiked(false)
            setCount(0)
        }
        else {
            setLiked(true)
            setCount(count + 1)
        }
    }

    const handleData = async () => {

        const favData = {
            I_id: info._id,
            product_name: info.product_name,
            model: info.model,
            price: info.price,
            image: info.image[0],
            email: user.email,
            count: count
        }
        console.log(favData)


        if (liked && count === 1 || likedData?.count === 0) {

            fetch(`http://localhost:5000/api/v1/getFav/${likedData?._id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        toast.error("Removed from your favourite list")
                        refetch();
                    }
                })

        }
        else {

            const response = await fetch('http://localhost:5000/api/v1/addFav', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(favData),
            })
            if (response.ok) {
                toast.success("Added to your favourite list")
                refetch();
            }
            else {
                toast.error("Couldn't add to your favurite");
            }
        }
    }

    const handleClick = () => {
        handleLike();
        handleData();
    }

    return (
        <div>
            <button className="" title={likedData?.email === user?.email ? "" : "add to favourite"}
                onClick={handleClick}
            >

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={likedData?.email === user?.email ? "red" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>


        </div>
    );
};

export default LikeButton;