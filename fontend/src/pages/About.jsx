import { assets } from "../assets/frontend_assets/assets"
import NewsLetterBox from "../components/NewsLetterBox"
import Title from "../components/Title"



const About = () => {

  return (
    <div>

      <div className="text-2xl text-center pt-8 boreder-t">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className="w-full md:max-w-[450px] rounded-md"/>
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt nobis 
              sunt iste aliquid veniam, minima, ullam adipisci cumque rem alias dolores, 
              eaque nisi. Minus laudantium maxime voluptate, saepe odit culpa?
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum qui repellendus 
              in porro fuga quo quod. Commodi rem quo nam nobis quam corrupti iusto aliquid!
            </p>
            <p className="text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum qui repellendus 
              in porro fuga quo quod. Commodi rem quo nam nobis quam corrupti iusto aliquid!
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum qui repellendus 
              in porro fuga quo quod. Commodi rem quo nam nobis quam corrupti iusto aliquid!
            </p>
            <b className="text-gray-800 text-lg">Our Mission</b>
            <p className="text-justify">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum qui repellendus 
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus consequatur 
              amet nostrum voluptatem quos adipisci cumque dolorem, sed blanditiis error.
            </p>
        </div>
      </div>

      <div className=" text-2xl sm:text-3xl  py-4">
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
       
        <div className="border px-8 md:px-10 py-8 sm:py-10 flex flex-col gap-5">
          <b className="text-xl">Quality Assurance:</b>
          <p className="text-justify text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro voluptatum adipisci 
            numquam laborum consequatur rerum nam! Aliquid libero unde distinctio numquam laborum consequatur rerum nam! Aliquid 
            libero unde distincti?
          </p>
        
        </div>
        <div className="border px-8 md:px-10 py-8 sm:py-10 flex flex-col gap-5">
          <b className="text-xl">Convenience:</b>
          <p className="text-justify text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro voluptatum adipisci 
            numquam laborum consequatur rerum nam! Aliquid libero unde distinctio numquam laborum consequatur rerum nam! Aliquid 
            libero unde distincti?
          </p>
        </div>
        
        <div className="border px-8 md:px-10 py-8 sm:py-10 flex flex-col gap-5">
          <b className="text-xl">Exceptional Customers Service:</b>
          <p className="text-justify text-gray-600">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro voluptatum adipisci 
            numquam laborum consequatur rerum nam! Aliquid libero unde distinctio numquam laborum consequatur rerum nam! Aliquid 
            libero unde distincti?
          </p>
        </div>

      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About