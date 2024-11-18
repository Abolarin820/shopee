import axios from 'axios'
import { useContext, useState } from "react"
import { assets } from "../assets/frontend_assets/assets"
import CartTotal from "../components/CartTotal"
import Title from "../components/Title"
import { ShopContext } from "../context/ShopContext"
import { toast } from "react-toastify"


const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);

  const [formData, setFormData] = useState({
      firstName:'',
      lastName:'',
      email:'',
      street:'',
      city:'',
      state:'',
      zipcode:'',
      country:'',
      phone:''
  })

  const onChangeHandler = (e)=>{

    const name = e.target.name
    const value = e.target.value

    setFormData((data) => ({...data, [name]:value}))

  }
  
  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
     let orderItems = [];
     
     for(let items in cartItems){
        for(let item in cartItems[items]){
          if(cartItems[items][item] > 0){
            let itemInfo = structuredClone(products.find(product => product._id === items))
            if(itemInfo){
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
     }
    

     let orderData = {
      address: formData,
      items: orderItems,
      amount: getCartAmount() + delivery_fee 

     }

     //Razorpay
     const initPay = (order)=>{
        let options ={
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          name: 'Order Payment',
          description: 'Order Payment',
          order_id: order.id,
          receipt: order.receipt,
          handler: async (response)=>{
            console.log(response)
            try {
              const {data} = await axios.post(backendUrl + '/api/order/verifyRazorpay',response, {headers:{token}} )
              console.log(data)
              if(data.success ){
                navigate('/order');
                setCartItems({})
              }

            } catch (error) {
              toast.error(error)
            }
          }
        }
        const rzp = new window.Razorpay(options)
        rzp.open();
     }

     switch (method) {

      //API calls for cod
      case 'cod':
        const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers:{token}})
        
        if(response.data.success){
          setCartItems({})
          navigate('/order')
        }else{
          toast.error(response.data.message)
        }

          break;
      case 'stripe':
        const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers:{token}})
          
            if(responseStripe.data.success){
              const {session_url} = responseStripe.data
              window.location.replace(session_url)
            }else{
              toast.error(responseStripe.data.message)
            }
          break;
        case 'razorpay':
            const responseRazorpay = await axios.post(backendUrl + '/api/order/razorpay', orderData, {headers:{token}})
              console.log(responseRazorpay.data.order)
            if(responseRazorpay.data.success){
              initPay(responseRazorpay.data.order)
            }else{
              toast.error(responseRazorpay.data.message)
            }
          break;

        default:
          break;
     }

    } catch (error) {

      toast.error(error.message)
    }

  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t">
        {/************************Left SIde**************** */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
            <div className="text-xl sm:text-2xl my-3">
                <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
            </div>
            <div className="flex gap-3">
              <input onChange={onChangeHandler} name="firstName" value={formData.firstName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-gray-500" type="text" required placeholder="First Name"/>
              <input onChange={onChangeHandler} name="lastName"  value={formData.lastName} className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-gray-500" type="text" required placeholder="Last Name"/>
            </div>

            <input onChange={onChangeHandler} name="email"  value={formData.email} className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-gray-500" type="email" required placeholder="Email Address"/>
            <input onChange={onChangeHandler} name="street"  value={formData.street} className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-gray-500" type="text" required placeholder="Street"/>
            
            <div className="flex gap-3">
              <input onChange={onChangeHandler} name="city"  value={formData.city} className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-gray-500" type="text" required placeholder="City"/>
              <input onChange={onChangeHandler} name="state"  value={formData.state} className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-gray-500" type="text" required placeholder="State"/>
            </div>

            <div className="flex gap-3">
              <input onChange={onChangeHandler} name="zipcode"  value={formData.zipcode} className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-gray-500" type="number" maxLength={6} minLength={6} required placeholder="Zip Code"/>
              <input onChange={onChangeHandler} name="country"  value={formData.country} className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-gray-500" type="text" placeholder="Country"/>
            </div>
            <input onChange={onChangeHandler} name="phone"  value={formData.phone} className="border border-gray-300 rounded py-1.5 px-3.5 w-full text-gray-500" type="number" minLength={12} maxLength={12} required placeholder="Mobile (+234) 7034557976"/>
        </div>

        {/*************Right Side********************** */}
        <div className="mt-8">
            <div className="mt-8 min-w-80">
              <CartTotal />
            </div>

            <div className="mt-12">
                <Title text1={'PAYMENT'} text2={'METHODS'}/>

                {/************Payment Method Selection************* */}
                <div className="flex gap-3 flex-col lg:flex-row">

                    <div onClick={()=>setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe'? 'bg-red-500': ''}`}></p>
                      <img src={assets.stripe_logo} alt="" className="h-5 mx-4"/>
                    </div>
                    <div onClick={()=>setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay'? 'bg-red-500': ''}`}></p>
                      <img src={assets.razorpay_logo} alt="" className="h-5 mx-4"/>
                    </div>
                    <div onClick={()=>setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                      <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod'? 'bg-red-500': ''}`}></p>
                      <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
                    </div>

                </div>

                <div className="w-full text-end mt-8">
                    <button type="submit"  className="bg-black text-white px-16 py-3 text-sm">Place Order</button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default PlaceOrder