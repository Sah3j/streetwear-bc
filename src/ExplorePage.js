import React from 'react'
import { useUserAuth } from "./context/UserAuthContext"
import Navbar from "./Navbar.js"
import NewPost from "./NewPost.js"
import { Outlet } from "react-router-dom"

function ExplorePage() {
    const { user, logout } = useUserAuth();
    const handleLogout = async() => {
        try{
            await logout();
        }
        catch(err) {
            console.log(err.message)
        }
    }
  return (
    <div>
      <div>
        <Navbar user={user} handleLogout={handleLogout} />
        <Outlet />
        <div className="fixed bottom-4 right-4">
          <NewPost />
        </div>
        
      </div>
    </div>
  )
}

export default ExplorePage