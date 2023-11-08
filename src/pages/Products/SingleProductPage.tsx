import { useLoaderData } from "react-router-dom";

export default function SingleProductPage() {
  const singleProduct = useLoaderData()
  console.log(singleProduct)
  console.log("Single Product Page");
  return (
    <div>
      Single Product Page
    </div>
  )
}
