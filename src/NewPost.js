import React from 'react'
import { useState } from 'react';
import { useUserAuth } from "./context/UserAuthContext"
import {Modal, Button} from "flowbite-react"


function NewPost() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const { addNewPost } = useUserAuth();
    const [show, setShow] = useState(false);

    const handleFileChange = event => {
      setSelectedFile(event.target.files[0]);
    }

    async function handleClick() {
        await addNewPost(selectedFile, title, description, location, price);
        setShow(!show);
        location.reload(true);
    }

    function modalClick(){
        setShow(!show);
    }

  return (
    <>
        <Button onClick={modalClick}>
            New Post
            </Button>

        <Modal
            show={show}
            size="lg"
            onClose={modalClick}
        >
            <Modal.Header>
                Create a new post
            </Modal.Header>
            <Modal.Body>
            { selectedFile ? (
                        <div className="flex items-center justify-center w-3/4 overflow-hidden">
                        <img className="object-cover w-full h-full" src={URL.createObjectURL(selectedFile)} />
                        </div>
                    ) : (
                        <div class="flex items-center justify-center w-3/4">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center mb-2 w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                <svg aria-hidden="true" class="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" onChange={handleFileChange}/>
                        </label>
                        </div> 
                    )}
                    
                    <input onChange={(e)=>setTitle(e.target.value)} value={title} placeholder="Item Title" type="text" id="small-input" class="block w-full mb-2 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    <textarea id="message" value={description} onChange={(e)=>setDescription(e.target.value)} rows="4" class="block p-2.5 mb-2 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Post description..."></textarea>

                    <select onChange={(e)=>setLocation(e.target.value)} id="small" class="block w-full p-2 mb-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Location</option>
                    <option value="Abbotsford">Abbotsford</option>
                    <option value="Burnaby">Burnaby</option>
                    <option value="Chilliwack">Chilliwack</option>
                    <option value="Coquitlam">Coquitlam</option>
                    <option value="Kamloops">Kamloops</option>
                    <option value="Kelowna">Kelowna</option>
                    <option value="Langley">Langley</option>
                    <option value="Nanaimo">Nanaimo</option>
                    <option value="New Westminster">New Westminster</option>
                    <option value="Port Coquitlam">Port Coquitlam</option>
                    <option value="Richmond">Richmond</option>
                    <option value="Surrey">Surrey</option>
                    <option value="Vancouver">Vancouver</option>
                    <option value="Victoria">Victoria</option>
                    </select>
                    <input onChange={(e)=>setPrice(e.target.value)} value={price} placeholder="Price" type="number" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </Modal.Body>
            <Modal.Footer>
            <Button onClick={handleClick}>
                Add Post
            </Button>
            </Modal.Footer>
        </Modal>

    </>
  )
}

export default NewPost
