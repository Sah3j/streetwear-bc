import React, {useState} from 'react'
import {Card} from 'flowbite-react';
import {Modal, Button} from "flowbite-react"
import { MdDeleteOutline } from 'react-icons/md';


function ProfilePostCard({data, handleDelete}) {

    const [show, setShow] = useState(false);

    async function handleDeleteClick(){
        await handleDelete(data.id, data.timestamp);
        setShow(!show);
    }

  return (
    <div>

        <div className="max-w-xs my-4 sm:m-4">
            <Card>
                <div className='w-52 h-52 overflow-hidden'>
                    <img className="object-cover w-full h-full" src={data.productPhoto} alt="product photo"/>
                </div>
                <h2 className='-mt-4 font-bold text-lg'>{data.title}</h2>
                <div className="flex -mt-4 justify-between font-normal text-gray-700 dark:text-gray-400">
                    <div>
                        {data.location}
                    </div>
                    <div>
                        ${data.price}
                    </div>
                </div>
                <p className="font-normal font-bold -mt-2 tracking-tight text-gray-900 dark:text-white">
                {data.description}
                </p>
                <div className='flex justify-end'>
                    <a className="cursor-pointer" onClick={()=>setShow(!show)}><MdDeleteOutline /></a>
                </div>
                <Modal
                    show={show}
                    size="md"
                    popup={true}
                    onClose={()=>setShow(!show)}
                >
                    <Modal.Header />
                    <Modal.Body>
                    <div className="text-center">
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this product?
                        </h3>
                        <div className="flex justify-center gap-4">
                        <Button
                            color="failure"
                            onClick={handleDeleteClick}
                        >
                            Yes, I'm sure
                        </Button>
                        <Button
                            color="gray"
                            onClick={()=>setShow(!show)}
                        >
                            No, cancel
                        </Button>
                        </div>
                    </div>
                    </Modal.Body>
                </Modal>
            </Card>
        </div>

    </div>
  )
}

export default ProfilePostCard