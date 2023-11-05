import '../../styles/ProductsCard.css'

export default function ProductsCard({ product }) {

    console.log(product.image[0])

    return (
        <div className="product-card">
            <img src='https://www.startech.com.bd/image/cache/catalog/processor/amd/ryzen-5-7600/ryzen-5-7600-01-500x500.webp' alt="" />
            <h1>Airbuds 3 SE</h1>
            <p className="price">Tk 1,999</p>
            <p>Wiwu Airbuds 3 SE White True Wireless Earbuds...</p>
            <button>Add to Cart</button>
        </div>
    )
}
