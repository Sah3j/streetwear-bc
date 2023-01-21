import React, { useState, useEffect } from 'react'
import ProfilePostCard from "./ProfilePostCard.js"
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "./firebase"
import { useUserAuth } from "./context/UserAuthContext"

function ProfilePosts() {
  const { user, deletePost } = useUserAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const data = []
    querySnapshot.forEach((doc) => {
      if (doc.data().userID === user.uid) {
        data.push({ id: doc.id, ...doc.data() });
      }
    });
    setData(data);
  });
  }, [user]);

  async function handleDelete(id, photoName) {
    await deletePost(id, photoName);
  }

  return (
    <div>
      <div className="flex justify-center items-center flex-wrap">
        {data.map(item => (
          <ProfilePostCard key={item.id} data={item} handleDelete={handleDelete}/>
        ))}
      </div>
    </div>
  )
}

export default ProfilePosts