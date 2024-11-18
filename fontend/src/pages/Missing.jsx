import {Link} from 'react-router-dom'

const Missing = () => {
  return (
    <div className='flex flex-col items-center my-20'>
      <div>
        <h3 className='font-medium text-2xl text-gray-500'>This page can’t be reached</h3>
        <p className='text-md text-gray-600'>The route you requested unexpectedly closed the connection.</p>
        <p  className='text-md text-gray-600 my-6'>Try:
          <li>Checking the spelling</li>
          <li>Checking the connection</li>
        </p>
        <Link to={'/'}><button  className="py-2 px-6 bg-blue-700 text-white rounded text-sm mt-2">Back to Home</button></Link>
      </div>
    </div>
  )
}

export default Missing;