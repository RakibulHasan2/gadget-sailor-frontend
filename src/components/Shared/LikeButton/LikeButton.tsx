import { useState } from "react";
import toast from "react-hot-toast";
import { userData } from "../../../hooks/getUserData";
import { IProduct } from "../../../types/ProductsType";
//import useApiData from "../../../hooks/getAPIData";
import React from "react";
import { FavDataType, FavDataTypeResponse } from "../../../types/FavDataType";



const LikeButton = ({ info }: IProduct) => {
    const [liked, setLiked] = useState(false);
    //const [likeCount, setLikeCount] = useState(0);
    const user = userData();
    const [data, setdata] = React.useState<FavDataType[]>([]);
    React.useEffect(() => {
        fetch(`http://localhost:5000/api/v1/getFav/${user.email}`)
            .then(res => res.json())
            .then((data: FavDataTypeResponse) => {
                // console.log(data.data)
                setdata(data.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [user.email]);
    const likedData: FavDataType | undefined = data.find((item) => item.product_name === info.product_name)
    //const likedInfo = likedData[0];
    // console.log(info)
    // console.log(data)
    // console.log(likedData)
    //console.log(likedInfo)

    const handleLike = async () => {

        const favData = {
            product_name: info.product_name,
            model: info.model,
            price: info.price,
            image: info.image[0],
            email: user.email
        }
        console.log(favData)


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


    return (
        <div>
            <button className="" title={likedData?.email === user?.email ? "" : "add to favourite"}
                onClick={handleLike}
            >

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={likedData?.email === user?.email ? "red" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>


        </div>
    );
};

export default LikeButton;