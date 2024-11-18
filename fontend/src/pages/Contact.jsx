import { assets } from "../assets/frontend_assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"
import Title from "../components/Title"


const Contact = () => {
  return (
    <div>

      <div className="text-center text-2xl pt-10 border-t">
          <Title text1={'CONTACT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Story</p>
          <p className="text-gray-500">White House, Narto Junction,<br /> Gbagba Ilorin Kwara State Nigeria.</p>
          <p className="text-gray-500">Tel: (+234) 8158203062 <br /> Email: Support@help.com</p>
          <p className="font-semibold text-xl text-gray-600">Careers At Cybercode Tech. </p>
          <p className="text-gray-500">Learn more about our teams and jop openings</p>
          <button className="border border-black px-4 py-2 sm:px-8 sm:py-4 text-sm hover:bg-black hover:text-white transition-all duration-500 rounded">Explore Job</button>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  )
}

export default Contact