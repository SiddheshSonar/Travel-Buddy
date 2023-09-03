"use client"

import { Button } from "@chakra-ui/react";
import MyMap from '@/components/map'
import React from 'react'
import { useRouter } from "next/navigation";

export default function Home() {
  const [user, setUser] = React.useState(null);
  const router = useRouter();

  React.useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, []);

  return (
    <div className="relative">
      <MyMap/>
      {!user && (
        <div 
          style={{backdropFilter: 'blur(2px)'}}
          className="absolute inset-0 bg-black bg-opacity-10 flex justify-center items-center"
        >
          <Button variant="outline" colorScheme="teal" onClick={() => {
            router.push('/auth')
          }}>
            Sign In / Sign Up
          </Button>
        </div>
      )}
    </div>
  );
}
