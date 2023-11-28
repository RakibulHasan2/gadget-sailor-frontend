import { useEffect, useState } from 'react';
import img from '../assets/banner/output.png'
export default function Modal() {
    const [showModal, setShowModal] = useState<boolean>(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowModal(true);
        }, 10000);

        return () => clearTimeout(timeout);
    }, []);

    const closeModal = () => {
        setShowModal(false);
    };
    return (
        <>
            {showModal && (
                <div className="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50">
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-white rounded-lg relative w-1/3">
                            <button
                                className="absolute top-2 right-2 text-gray-800hover:text-gray-700 z-20 text-2xl px-2 hover:bg-blue-800 hover:text-white hover:rounded-lg"
                                onClick={closeModal}
                            >
                              X
                            </button>
                           <img src={img} alt="" />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
