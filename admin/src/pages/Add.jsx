import axios from 'axios'
import { useState } from "react"
import { assets } from "../assets/assets"
import { backendUrl } from '../App';
import { toast } from 'react-toastify';


const Add = ({token}) => {

  const [image1,setImage1] = useState(false);
  const [image2,setImage2] = useState(false);
  const [image3,setImage3] = useState(false);
  const [image4,setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestSeller, setbestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {

      const formData = new FormData();
      formData.append("name",name); 
      formData.append("description",description);
      formData.append("price",price);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("bestSeller",bestSeller);
      formData.append("sizes",JSON.stringify(sizes));

      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);

      const response = await axios.post(backendUrl + '/api/product/add', formData, {headers:{token}});
      
      if(response.data.status){
        toast.success(response.data.message);
        setName('')
        setDescription('')
        setPrice('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)

      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-3 w-full items-start mb-3">
        <div >
            <p className="mb-2 text-sm">Upload Image</p>
          
            <div className="flex gap-2">
              
              <label htmlFor="image1">
                <img  src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" className="cursor-pointer w-20" />
                <input onChange={(e)=> setImage1(e.target.files[0])} type="file"  id="image1" hidden />
              </label>

              <label htmlFor="image2">
                <img  src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" className="cursor-pointer w-20" />
                <input onChange={(e)=> setImage2(e.target.files[0])} type="file"  id="image2" hidden />
              </label>

              <label htmlFor="image3">
                <img  src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" className="cursor-pointer w-20" />
                <input onChange={(e)=> setImage3(e.target.files[0])} type="file"  id="image3" hidden />
              </label>

              <label htmlFor="image4">
                <img  src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" className="cursor-pointer w-20" />
                <input onChange={(e)=> setImage4(e.target.files[0])} type="file"  id="image4" hidden />
              </label>
            </div>
        </div>

        <div className="w-full mb-2">
          <p className="mb-2 text-sm">Product Name</p>
          <input onChange={(e)=> setName(e.target.value)}  value={name} type="text" placeholder="Type here" required className="w-full max-w-[345px] px-3 py-2" />
        </div>

        <div className="w-full mb-2">
          <p className="mb-2 text-sm">Product Description</p>
          <textarea type="text" onChange={(e)=> setDescription(e.target.value)} value={description} placeholder="Product description here..." required className="w-full max-w-[345px] px-3 py-2" />
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-4 mb-3">
            <div>
              <p className="mb-2 text-sm">Product Category</p>
              <select className="w-full px-3 py-2" onChange={(e)=> setCategory(e.target.value)}>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm">Sub Category</p>
              <select className="w-full px-3 py-2" onChange={(e)=> setSubCategory(e.target.value)}>
                <option value="Topwear">Topwear</option>
                <option value="Bottomwear">Bottomwear</option>
                <option value="Winterwear">Winterwear</option>
              </select>
            </div>

            <div>
              <p className="mb-2 text-sm">Product Price</p>
              <input type="Number" placeholder="$25" className="w-full px-3 py-2 sm:w-[120px]" onChange={(e)=> setPrice(e.target.value)} value={price} />
            </div>
        </div>

        <div>
            <p className="mb-2 text-sm">Product Sizes</p>
            <div className="flex gap-3">
              <div onClick={()=> setSizes(prev => prev.includes('S') ? prev.filter(item => item !== 'S') : [...prev, 'S'])}>
                <p className={` ${sizes.includes('S')? 'bg-pink-100' : 'bg-slate-200'} cursor-pointer px-3 py-1`}>S</p>
              </div>

              <div onClick={()=> setSizes(prev => prev.includes('M') ? prev.filter(item => item !== 'M') : [...prev, 'M'])}>
                <p className={` ${sizes.includes('M')? 'bg-pink-100' : 'bg-slate-200'} cursor-pointer px-3 py-1`}>M</p>
              </div>

              <div onClick={()=> setSizes(prev => prev.includes('L') ? prev.filter(item => item !== 'L') : [...prev, 'L'])}>
                <p className={` ${sizes.includes('L')? 'bg-pink-100' : 'bg-slate-200'} cursor-pointer px-3 py-1`}>L</p>
              </div>

              <div onClick={()=> setSizes(prev => prev.includes('XL') ? prev.filter(item => item !== 'XL') : [...prev, 'XL'])}>
                <p className={` ${sizes.includes('XL')? 'bg-pink-100' : 'bg-slate-200'} cursor-pointer px-3 py-1`}>XL</p>
              </div>
 
              <div onClick={()=> setSizes(prev => prev.includes('XXL') ? prev.filter(item => item !== 'XXL') : [...prev, 'XXL'])}>
                <p className={` ${sizes.includes('XXL')? 'bg-pink-100' : 'bg-slate-200'} cursor-pointer px-3 py-1`}>XXL</p>
              </div>

            </div>
        </div>

        <div className="flex gap-2 mt-3">
          <input type="checkbox"  id="bestSeller" onChange={()=> setbestSeller(prev => !prev) } checked={bestSeller}/>
          <label className="cursor-pointer text-sm" htmlFor="bestSeller">Add to bestSeller</label>
        </div>

        <button type="submit" className="w-28 py-3 mt-4 bg-black text-white rounded" >ADD</button>
    </form>
  ) 
}

export default Add