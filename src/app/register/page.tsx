//client component required to use firebase authentication
'use client'

//imports needed for the program to run
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import Image from "next/image";
import React, { useState } from "react"
import { auth, db } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import Link from 'next/link';

//method that manages the user registration process and is exported
function RegisterUser()
{
    
    //variables set to store the user input from the form, using useState hooks from react
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[firstname, setfirstname] = useState("");
    const[surname, setsurname] = useState("");

    //register handler handles the registration process and prevents the form from refreshing page
    const RegisterHandler= async (e) =>
        {
            e.preventDefault();
            try
            {
                //built in function from firebase authentication talks to firebase and creates a new user in the firebase authentication
                await createUserWithEmailAndPassword(auth, email, password);
                //new user is avalable through this user variable
                const user = auth.currentUser;
                console.log(user);
                //if user is successfully created
                if(user) {
                  //built in function from firebase authentication updates the user profile
                  await updateProfile(user, {
                    //displayname is updated to the firstname and surname inputted and concatenated together with a space
                    displayName: firstname + " " + surname,
                  });
                  console.log(user.displayName);
                  //this refreshed 
                  await user.getIdToken(true);
                }
                //display a success message in the console and on the screen
                console.log("User registered successfully")
                toast.success("User succesfully registrated!",{position:"top-center"});
                //if successful, user is redirected to the login page (root page)
                window.location.href="../";
            }
            catch(error)
            {
                //display error message in the console and screen if there is an error such as wrong details inputted
                console.log(error.message);
                toast.error(error.message, {position: "top-center"});
            }
        };
  // function isreturning the JSX to be displayed on the screen
  return (
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
        {/*when the form is submitted, register handler is called*/}
        <form onSubmit ={RegisterHandler}>
            <div>
              <label htmlFor="firstname" className="login-form">
                First Name
              </label>
              <input type="text" onChange={(e) => setfirstname(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#1a1a1a] dark:border-white/[.145] dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="surname" className="login-form">
                Surname
              </label>
              <input type="text" onChange={(e) => setsurname(e.target.value)} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-[#1a1a1a] dark:border-white/[.145] dark:text-white"
              />
            </div>

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
              Register
            </button>
            <div>
            {/*user can click this link from the register page to login an existing account*/}
            <Link href="../">Already have an account? Login here</Link>
            </div>
          </form>
        </div>
        {/* Register form with fields for firstname,surname,email and password */}
        {/*'required' fields provides error validation using client side*/}
          
        </main>

        <footer>
        </footer>
      </div>
  );
}
export default RegisterUser

