import React from 'react'
import LoginPicture from "./login-page-pic.jpeg"
import { Outlet } from "react-router-dom"


function LoginPage() {
  return (
    <div className='grid md:grid-cols-2'>
        <div className='w-full h-screen bg-blue-500 max-md:hidden'>
            <img className="object-cover h-full w-full" src={LoginPicture} alt="Nike Sneakers" />
        </div>
        <div className='w-full h-screen bg-green-500 relative'>
            <img className="object-cover h-full w-full md:hidden" src={LoginPicture} alt="Nike Sneakers" />
            <div className='w-full h-full absolute top-0 left-0 flex justify-center items-center'>
                <Outlet />
            </div>
        </div> 
    </div>
  )
}

export default LoginPage