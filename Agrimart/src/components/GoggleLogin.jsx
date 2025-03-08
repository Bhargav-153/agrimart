import React from 'react'
import { Button } from './ui/button'
import { FcGoogle } from "react-icons/fc";



const GoogleLogin = () => {
    
  return (
    <Button variant="outline" className="w-full" >
      <FcGoogle />
      <span> Continue with Google</span>
    </Button>
  )
}

export default GoogleLogin