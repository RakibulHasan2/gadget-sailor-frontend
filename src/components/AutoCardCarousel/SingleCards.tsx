import { IProduct } from "../../types/ProductsType";


const SingleCards = ({ data }: IProduct) => {
    console.log(data)
    return (
        <div className="card">
            <img src={''} alt={`Card ${""}`} />
            {/* <h3>{card.title}</h3>
            <p>{card.description}</p> */}
        </div>
    );
};

export default SingleCards;