import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";


const Products = () => {
  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');

  const fetchProductData = async()=>{
    products.map((item)=> {
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0]);
        return null; 
      }
    })
  }

  useEffect(()=>{
    fetchProductData();
  },[productId])

  return productData?(
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/***Product Data */}
      <div className="flex gap-12 sm:gap-4 flex-col sm:flex-row">

        {/*************************product images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
            <div className="barscroll flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18,7%] w:full">
              {
                productData.image.map((item,index)=>(
                  <img onClick={()=>setImage(item)} src={item} key={index} alt="" className="w-[100px] sm:w-24 sm:mb-3 flex-shrink-0 cursor-pointer"/>
                ))
              }
            </div>
            <div className="w-full sm:w-[80%]"> 
                <img className="w-full h-auto" src={image} alt="" />
            </div>
        </div>

        {/****************************product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
              <img src={assets.star_icon} alt="" className="w-3 "  />
              <img src={assets.star_icon} alt="" className="w-3 "  />
              <img src={assets.star_icon} alt="" className="w-3 "  />
              <img src={assets.star_icon} alt="" className="w-3 "  />
              <img src={assets.star_dull_icon} alt="" className="w-3 "  />
              <p className="pl-2">(123)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5 text-justify">{productData.description}</p>
          <div className="flex flex-col gap-4 my-6">
              <p>Select Size</p>
              <div className="flex gap-2">
                {productData.sizes.map((item,index)=>(
                  <button onClick={()=>setSize(item) } key={index} className={`border py-1 px-3 bg-gray-100 ${item === size ? 'border-orange-500':''}`}>{item}</button>
                ))}
              </div>
          </div>
          <button onClick={()=> addToCart(productData._id, size)} className="bg-black text-white py-3 px-8 text-sm active:bg-gray-700">ADD TO CART</button>

          <hr className="mt-4 sm:w-4/5"/>

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
              <p>100% Original Product</p>
              <p>Cash on delivery is availble on this project</p>
              <p>Easy return and exchange policy within 7 days</p>
          </div>

        </div>

      </div>
      {/*******Description & Review Section***** */}
      <div className="mt-20">
        <div className="flex">
          <b className="border text-sm px-5 py-3">Description</b>
          <p className="border text-sm px-5 py-3">Reviews (122)</p>
        </div>

        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
          <p className="text-justify">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae dicta omnis ipsa accusantium 
            explicabo voluptatum dolores numquam eum corporis placeat Lorem ipsum dolor, sit amet consectetur 
            adipisicing elit. Deserunt veritatis neque labore quos 
            quisquam, aut id. Debitis fugiat odio voluptate. Iure odio nobis amet beatae nemo doloribus dolor.
          </p>
          <p className="text-justify">{productData.description}</p>
        </div>
      </div>

      {/*******Display Related Products***** */}
      <div>
        <RelatedProduct category={productData.category} subCategory={productData.subCategory} />
      </div> 

    </div>
  ):
  <div className="opacity-0">

  </div>
}

export default Products