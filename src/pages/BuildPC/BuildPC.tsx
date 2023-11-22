import { BsCpu } from "react-icons/bs";

export default function BuildPC() {
    return (
        <div className="border mt-10 p-10">
            <h1>BUILD PC</h1>
            <div className="border flex justify-between mt-5">
                <BsCpu className = 'text-3xl text-blue-900'></BsCpu>
                <h1 className="font-bold text-xl">CPU</h1>
                <button type="button" className="p-3 bg-blue-600 text-white rounded-xl hover:bg-sky-700">Choose</button>
            </div>
        </div>
    )
}
