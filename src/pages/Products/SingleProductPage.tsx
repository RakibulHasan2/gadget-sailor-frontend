import { useLoaderData } from "react-router-dom";
import { useLoaderDataType } from "../../types/useLoaderDataType";

export default function SingleProductPage() {
  const singleProduct = useLoaderData() as useLoaderDataType;
  const singleProductData = singleProduct.data;
  console.log(singleProductData)
  return (
    <div>
      Single Product Page
    </div>
  )
}
