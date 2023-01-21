import React, { useState, useEffect } from 'react'
import ProductCard from "./ProductCard.js"
import { collection, getDocs, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase"

function Products() {
  const [data, setData] = useState([]);

  useEffect(() => {
      const q = query(collection(db, "posts"));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setData(data);
    });
  }, []);

  return (
    <div>
      <div className="flex justify-center items-center flex-wrap">
        {data.map(item => (
          <ProductCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}

export default Products