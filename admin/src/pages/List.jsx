import axios from "axios";
import { useEffect, useState } from "react"
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

 

const List = ({token}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      
      if(response.data.status){

        setList(response.data.products)
      }
      else{
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error( error.message)
    }
  }

  useEffect(()=>{

    fetchList();

  },[])

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers:{token}})

      if(response.data.status){
        toast.success(response.data.message);
        await fetchList() //display remaning products
      }
      else{
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <p className="mb-2">All Products List</p>
      <hr className="md:hidden " />
      <div className="flex flex-col gap-2">

        {/********List table tile */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 border bg-gray-100 text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/*********Product List**** */}

        {
          list.length ? 
          (
            list.map((item,index) => (
              <div key={index} className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm">
                <img className="w-12" src={item.image[0]} alt="" />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>{currency}{item.price}</p>
                <p onClick={()=> removeProduct(item._id)} className="text-right md:text-center cursor-pointer text-lg text-red-600">X</p>
              </div>
            ))
          ) 
          : 
          <p className="flex items-center justify-center text-lg text-red-700 my-10">Products Table is Empty</p>
        }

      </div>
    </>
  )
}

export default List