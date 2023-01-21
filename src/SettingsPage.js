import React, {useState, useEffect} from 'react'
import { useUserAuth } from "./context/UserAuthContext"

function SettingsPage() {

    

    const [selectedFile, setSelectedFile] = useState(null);

    const {updateUserPassword, updateUserEmail, updateDisplayName, updateProfilePicture, user} = useUserAuth();
    const [newDisplayName, setNewDisplayName] = useState(user.displayName)
    const [newEmail, setNewEmail] = useState(user.email)
    const [newPassword, setNewPassword] = useState("")
    const [loading, setLoading] = useState(false);

    const handleFileChange = event => {
        setSelectedFile(event.target.files[0]);
      }

    function handleProfileUpdate() {
        if(user.email !== newEmail){
            updateUserEmail(newEmail);
        }
        if(user.displayName !== newDisplayName) {
            updateDisplayName(newDisplayName);
        }
        if(selectedFile){
            updateProfilePicture(selectedFile, setLoading);
        }
        
    }

  return (
    <div>
        <div class="px-2 bg-white border-gray-200 mb-4 dark:bg-gray-900 dark:border-gray-700">
            <div class="container flex flex-wrap items-center justify-between mx-auto">
                <h4 class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Account Settings</h4>
            </div>
        </div>
        <div class="px-2 bg-white border-gray-200 md:px-20 dark:bg-gray-900 dark:border-gray-700">
            <div class="sm:flex">
                <div class="sm:w-1/3">
                    <label for="file-input" class="w-24 h-24 mb-3 rounded-full cursor-pointer">
                        <input type="file" accept="image/*" id="file-input" class="hidden" onChange={handleFileChange} />
                        {selectedFile ? (
                        <img id="profile-pic" class="w-24 h-24 object-cover rounded-full mx-auto" src={URL.createObjectURL(selectedFile)} alt="Profile Picture" />
                        ) : (
                        <img id="profile-pic" class="w-24 h-24 object-cover rounded-full mx-auto" src={user.photoURL} alt="Profile Picture" />
                        )}    
                        <a class="text-sm text-blue-600 dark:text-blue-500 hover:underline block text-center">Edit Photo</a>
                    </label>
                    
                </div>
                <div class="sm:w-2/3">
                    <div class="mb-4">
                        <label class="block font-bold mb-2">Display Name</label>
                        <input onChange={(e)=>setNewDisplayName(e.target.value)} value={newDisplayName} type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                    <div class="mb-4">
                        <label class="block font-bold mb-2">Email</label>
                        <input onChange={(e)=>setNewEmail(e.target.value)} value={newEmail} type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                    <div className='mb-4'>
                        <label className='block font-bold mb-2'>Password</label>
                        <input onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} type='password' class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" disabled/>
                    </div>
                    <button onClick={handleProfileUpdate} disabeled={loading} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SettingsPage