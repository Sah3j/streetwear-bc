import React from 'react'
import {Card, Button} from 'flowbite-react';

function ProductCard({data}) {
  return (
    <div>

        <div className="max-w-xs my-4 sm:m-4">
                <div className='flex'>
                    <img className="mr-2 w-8 h-8 rounded-full" src={data.userPhoto} alt="user photo"/>
                    <h1>{data.userName}</h1>
                </div>
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
                <Button disabled>
                    Contact Seller
                </Button>
            </Card>
        </div>

    </div>
  )
}

export default ProductCard