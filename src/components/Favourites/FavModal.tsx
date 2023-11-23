import { FaTimes } from "react-icons/fa";
import useApiData from "../../hooks/getAPIData";
import { userData } from "../../hooks/getUserData";

interface FavModalProps {
    onClose: () => void;
}

const FavModal = ({ onClose }: FavModalProps) => {
    const user = userData();
    const { data, refetch } = useApiData(`http://localhost:5000/api/v1/getFav/${user.email}`);
    console.log(data)


    return (
        <div>
            <div
                style={{
                    position: 'fixed',
                    top: '0',
                    right: '0',
                    height: '100%',
                    width: '38%',
                    backgroundColor: 'white',
                    zIndex: '999',
                    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    overflowY: 'scroll',
                }}
            >
                <div className="flex justify-between p-5 border" style={{ backgroundColor: 'rgb(5, 28, 77)' }}>
                    <h1 className="flex items-center text-lg font-bold text-white gap-x-3">Your Favourite list</h1>
                    {/* Close button */}
                    <button className="text-xl text-white" onClick={onClose} ><FaTimes /></button>
                </div>

            </div>
        </div>
    );
};

export default FavModal;