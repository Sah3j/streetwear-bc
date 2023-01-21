import React from 'react'
import ProfilePosts from "./ProfilePosts.js"
import { useUserAuth } from "./context/UserAuthContext"

function ProfilePage() {
  const { user } = useUserAuth();

  return (
    <>
      <div className="flex flex-col items-center">
        <img src={user.photoURL} className="w-32 h-32 rounded-full m-4" alt={user.displayName}/>
        <h1 className="text-center text-2xl font-medium">{user.displayName}</h1>
      </div>
      <ProfilePosts />
    </>
  )
}

export default ProfilePage