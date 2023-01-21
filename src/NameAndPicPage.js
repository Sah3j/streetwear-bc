import React, {useState, useEffect} from 'react'
import { useUserAuth } from "./context/UserAuthContext";
import { useNavigate } from "react-router-dom"

function NameAndPicPage() {
    const {user, upload} = useUserAuth();
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [picURL, setPicURL] = useState("https://schooloflanguages.sa.edu.au/wp-content/uploads/2017/11/placeholder-profile-sq.jpg");

    const handleFileChange = event => {
      setSelectedFile(event.target.files[0]);
    }

    const handleClick = () => {
      upload(selectedFile, setLoading, displayName)
        .then(() => {
          navigate("/explore");
        });
    }

    useEffect (() => {
        if(user && user.photoURL) {
            setPicURL(user.photoURL);
        }
    }, [user])

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col items-center pb-10">
          <label htmlFor="file-input" className="w-24 h-24 mb-3 rounded-full shadow-lg cursor-pointer">
            <input type="file" accept="image/*" id="file-input" className="hidden" onChange={handleFileChange} />
            {selectedFile ? (
                <img id="profile-pic" className="w-full h-full object-cover rounded-full" src={URL.createObjectURL(selectedFile)} alt="Profile Picture" />
            ) : (
                <img id="profile-pic" className="w-full h-full object-cover rounded-full" src={picURL} alt="Profile Picture" />
            )}
            
            
          </label>
          <label htmlFor="default-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Display Name</label>
          <input onChange={(e)=>setDisplayName(e.target.value)} value={displayName} type="text" id="default-input" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <div className="flex mt-4 space-x-3 md:mt-6">
            <a onClick={handleClick} disabeled={loading} className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Save</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NameAndPicPage
