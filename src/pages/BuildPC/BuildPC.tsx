import { BsCpu } from "react-icons/bs";
import useApiData from "../../hooks/getAPIData";
import { Link } from "react-router-dom";

export default function BuildPC() {


    const data = useApiData('http://localhost:5000/api/v1/allProducts/Components')
    // console.log(data.data)
    const uniqueSubCategories = new Set();

    // const productsData = useApiData('http://localhost:5000/api/v1/allProducts/Components/Motherboard')
    // console.log(productsData)

    return (
      <div>
        <div className="p-10 mt-10 border">
          <h1>BUILD PC</h1>
          {data.data.map((item) => {
            // Check if sub_category_name is unique
            if (!uniqueSubCategories.has(item.sub_category_name)) {
              uniqueSubCategories.add(item.sub_category_name);
    
              return (
                <div key={item._id} className="flex justify-between mt-5 border">
                  <BsCpu className="text-3xl text-blue-900"></BsCpu>
                  <h1 className="text-xl font-bold">{item.sub_category_name}</h1>
                 <Link to={`/chose-components/${item.sub_category_name}`}>
                 <button type="button" className="p-3 text-white bg-blue-600 rounded-xl hover:bg-sky-700">
                    Choose
                  </button>
                 </Link> 
                </div>
              );
            }
    
            return null; // Skip rendering if sub_category_name is not unique
          })}
        </div>
      </div>
    );
}
