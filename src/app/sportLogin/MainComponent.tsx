"use client"
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { setCookie } from '../redux-arch/adminauth/auth.slice';

const MainComponent = () => {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
    const router=useRouter()
      const handleSubmit = (event:any) => {
        event.preventDefault();
        // Perform login logi here, e.g., send username and password to server
        if(username==="sportadmin" && password==="sport321"){
            // localStorage?.setItem("sportadmin","true")
            // Cookies.set('sportadmin', 'true');
            setCookie("sportadmin","true")
            router.push("/sportsAdmin")
        }
        else{
            alert("wrong credential")
        }
      };
    
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          <div className="bg-white p-8 rounded shadow-md w-80">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username:</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mt-1 p-2 text-black w-full border border-gray-300 rounded-md outline-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm  font-medium text-gray-700">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full border text-black border-gray-300 rounded-md outline-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  required
                />
              </div>
              <button type="submit" className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600">Login</button>
            </form>
          </div>
        </div>
      );
    };
    
    
export default MainComponent;
