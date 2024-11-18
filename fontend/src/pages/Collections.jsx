import { useContext, useEffect, useState} from "react"
import { ShopContext } from "../context/ShopContext"
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";


const Collections = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [sortType, setSortType] = useState('relevant')

  const toggleCategory = (e)=>{
    if (category.includes(e.target.value)) {
      setCategory(prevArray => prevArray.filter(item => item !== e.target.value))
    }else{
      setCategory(prevArray => [...prevArray, e.target.value])
    }
  }

  const toggleSubCategory = (e)=>{
    if (subCategory.includes(e.target.value)) {
        setSubCategory(prevArray => prevArray.filter(item => item !== e.target.value));
    }else{
      setSubCategory(prevArray => [...prevArray, e.target.value]);
    }
  }

  const  applyFilter = ()=>{
    let productCopy = products.slice();

    if(showSearch && search){
      productCopy = productCopy.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if(category.length > 0){
      productCopy = productCopy.filter(item => category.includes(item.category));
    }
    if(subCategory.length > 0){
      productCopy = productCopy.filter(item => subCategory.includes(item.subCategory))
    }
    setFilterProducts(productCopy);
  }

  const sortProducts = ()=>{
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        
        setFilterProducts(fpCopy.sort((a,b)=>(a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b)=>(b.price - a.price))); 
        break;
      default:
        applyFilter();
        break; 
    }
  }

  useEffect(()=>{
    applyFilter();
  },[category,subCategory,search,showSearch,products]);

  useEffect(()=>{
    sortProducts();
  },[sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/******Filter Option***** */}
      <div className="min-w-60">
        <p  onClick={()=> setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img src={assets.dropdown_icon} alt="" className={`h-3 sm:hidden ${showFilter? 'rotate-90':''}`}/>
        </p>
        {/***Category filter* */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter? '':'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value={'Men'} onChange={toggleCategory}/>Men
              </p>
              <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value={'Women'} onChange={toggleCategory}/>Women
              </p>
              <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value={'Kids'} onChange={toggleCategory}/>Kids
              </p>
          </div>
        </div>
         {/***SubCategory* */}
         <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter? '':'hidden'} sm:block`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value={'Topwear'} onChange={toggleSubCategory}/>Topwear
              </p>
              <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
              </p>
              <p className="flex gap-2">
                  <input className="w-3" type="checkbox" value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
              </p>
          </div>
        </div>
      </div>

      {/******Right Side**** */}
      <div className="flex-1">

        <div className="flex justify-between text-base sm:text-2xl mb-4">
            <Title text1={'ALL'} text2={'COLLECTIONS'}/>
            {/**Product Sort */}
            <select onChange={(e)=>{setSortType(e.target.value)}} className="border-2 border-gray-300 text-sm px-2 outline-none rounded">
                <option value="relevant">Sort by: Relevant</option>
                <option value="low-high">Sort by Low to High</option>
                <option value="high-low">Sort by High to Low</option>
            </select>
        </div>

        {/***map products */}
          {
            filterProducts.length > 0 ?

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {
              
                filterProducts.map((item,index)=>(
                  <ProductItem key={index} name={item.name} id={item._id} image={item.image} price={item.price}/>
                ))
            }
          </div>
          :
          <p className="flex items-center justify-center pt-10 sm:pt-40 text-red-700">Something went wrong, check your network connection!!</p>
          }
      </div>
    </div>
  )
}

export default Collections