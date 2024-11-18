import { assets } from "../assets/frontend_assets/assets"


const Footer = () => {
  return (
    <div>
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
                <img src={assets.logo} alt="" className="mb-4 w-20 rounded-full"/>
                <p className="w-full md:w-2/3 text-gray-600 text-justify">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Harum eveniet minus cupiditate 
                    facilis dignissimos magni iste quia quibusdam accusamus tenetur.
                </p>
            </div>
            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>Home</li>
                    <li>About</li>
                    <li>Delivery</li>
                    <li>Policy Privacy</li>
                </ul>
            </div>
            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col gap-1 text-gray-600">
                    <li>(+234) 8158203062</li>
                    <li>SUpport@ecommerce.com</li>
                </ul>
            </div>

        </div>
        <div>
            <hr />
            <p className="py-5 text-sm text-center">Copyright &copy; 2024. All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer