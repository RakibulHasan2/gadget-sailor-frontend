import { useState } from "react";
import toast from "react-hot-toast";


const LikeButton = () => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const handleLike = () => {
        if (liked) {
            setLiked(false)
            setLikeCount(likeCount - 1)
            toast.error("Removed from your favourite list")
        }
        else {
            setLiked(true)
            setLikeCount(likeCount + 1)
            toast.success("Added to your favourite list")
        }
    }


    return (
        <div>
            <button className="" title={liked ? "" : "add to favourite"}
                onClick={handleLike}
            >

                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={liked ? "red" : "none"} viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
            </button>

            <div>Count: {likeCount}</div>
        </div>
    );
};

export default LikeButton;