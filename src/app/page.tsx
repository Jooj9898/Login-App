//Author : Justin McGarr

/* Program Description:
This program builds a simple Node.js web app which allows users to register a new account and/or login by linking the program to firebase authentication. 
From there the user is redirected to a page where they are greeted by a message and can choose to log out. The program uses client side validation to
ensure forms are filled out correctly. The program also uses the react-toastify library to display success and error messages to the user. This page.tsx is the
basic landing page where users can login.
*/

//Date: 07/04/2025

//client component for firebase
'use client'

//imports needed for the program to run
import React, {useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "./firebase";
import { toast } from "react-toastify";
import Image from "next/image";
import Link from 'next/link';

//method that manages the user login process and is exported 
function LoginUser() {
    //state variables to set the email and password from user input
    const [email, setEmail] = useState("");
    const[password, setPassword] = useState("");

    //preventing default form submission (refreshing the page)
    const LoginHandler =  async (e) => {
        e.preventDefault();
        try {
            //built in function from firebase authentication talks to firebase
            const userCredential = await signInWithEmailAndPassword(auth,email,password);
            const user = userCredential.user;
            
            //if successful, toast (import from react) message displats on screen
            console.log("user logged in successfully")
            //on success, user is sent to greeting
            window.location.href="/home";
            toast.success("User logged in Successfully", {position: "top-center"});
        }
        catch(error)
        {
            //if there is an error (e.g. wrong details inputted) message is displayed
            console.log(error.message);
            toast.error(error.message, {position: "bottom-center"});
        }
    };
    // function isreturning the JSX to be displayed on the screen
    return (
      //grid layout for the page, using tailwind css for styling
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <Image
              //className="dark:invert"
              src="/Babylon.svg"
              alt="Babylon Logo"
              width={450}
              height={38}
              priority
            />
            <div className = "form-container">
            {/*submitting the form calls the handler*/}
            {/*form is built using basic html and some personal css, with react hooks to set the state of the input fields*/}
            <form onSubmit ={LoginHandler}>
                <div>
                  <label htmlFor="email" className="login-form">
                    Email
                  </label>
                  <input type="email" onChange={(e) =>setEmail(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#1a1a1a] dark:border-white/[.145] dark:text-white"
                  />
                </div>
    
                <div>
                  <label htmlFor="password" className="login-form">
                    Password
                  </label>
                <input type="password" onChange={(e) =>setPassword(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#1a1a1a] dark:border-white/[.145] dark:text-white"
                  />
                </div>
                <button type="submit" className="mt-2 w-full bg-foreground text-background py-2 rounded-lg font-semibold hover:bg-[#383838] dark:hover:bg-[#ccc]">
                  Log In
                </button>
                <div>
                  {/*user can click this link from the login page to register a new account*/}
                  <Link href="/register">Dont have an account? Register here</Link>
                </div>
              </form>
            </div>
            {/* Login form with fields for email and password, which firebase uses for auth */}
            {/*'required' fields provides error validation using client side*/}
              
            </main>
    
            <footer>
            </footer>
          </div>
      );
    }
    
    
//exporting the function so it can be used in other files
export default LoginUser
