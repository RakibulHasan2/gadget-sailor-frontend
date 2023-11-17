
export default function MyOrder() {
  return (
    <div className="flex justify-center mt-10 mb-10">
      <div className="border w-9/12">
        <p className="text-3xl font-bold">Shopping Cart</p>
        <div className="overflow-x-auto mt-5">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Product Name</th>
                <th>Model</th>
                <th>Quantity</th>
                <th></th>
                <th>Unit Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
                <td>Blue</td>
                <th><button className='text-2xl text-blue-900'>x</button></th>
                <td>Blue</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Hart Hagerty</td>
                <td>Hart Hagerty</td>
                <td>Hart Hagerty</td>
                <th><button className='text-2xl text-blue-900'>x</button></th>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Brice Swyre</td>
                <td>Brice Swyre</td>
                <td>Brice Swyre</td>
                <th><button className='text-2xl text-blue-900'>x</button></th>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
              {/* row 4 */}
              <tr>
                <th>4</th>
                <td>Brice Swyre</td>
                <td>Brice Swyre</td>
                <td>Brice Swyre</td>
                <td>Brice Swyre</td>
                <th><button className='text-2xl text-blue-900'>x</button></th>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
