"use client"
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'

const MainComponent = () => {
const router=useRouter()
  
  useEffect(() => {
    router.push("/sports");
  }, []);

  return (
    <div>Home</div>
  )
}

export default MainComponent