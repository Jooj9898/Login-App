//client component required to use firebase authentication 
'use client'

//imports needed for the program to run
import React, {useEffect, useState} from "react";
import {auth, db } from "../firebase";
import Image from "next/image";

//method greeting manages displaying a message to the user that is logged in as well as a logout option
function Greeting() 
{
    //variable to store the currently authenticated user from firebase
    const[currUser, setUser] = useState(null);
    //variable to track if the auth check is loading or not
    const[loading, setLoading] = useState(true);
    
    //
    useEffect(() =>{
        /*built in firebase function onAuthStateChanged listens for any auth state changes such as logging in or out
        ,when there is a change in state, the following is recursively calling it back with currUser, so details are refreshed etc */
        const unsubscribe = auth.onAuthStateChanged((currUser)=>{
            console.log(currUser);
            //if the user is currrently logged in
            if(currUser){
                console.log("User is logged in", currUser.displayName);
                //refresh user id token so the details can be updated for each different user that is logged in
                currUser.getIdToken(true).then(() => {
                //the built in firebase function setUser sets the user on this page to currUser (our parameter)
                setUser({...currUser});
                //auth check is done
                setLoading(false);
            });
            } 
            else 
            {
                //if the user is not logged in, set the user to null
                setUser(null);
                //even if it was unsuccessful , auth check is now done
                setLoading(false);
            }
        });
        
        //cleanup function to unsubscribe from the auth listener when the component unmounts for
        return () => unsubscribe();
    }, []);
    
    //function to handles the logging out process
    function LogoutHandler() 
    {
        try{
            //built in firebase function to sign out the user
            auth.signOut();
            //once the logout button is pressed, user is redirected back to the login page/root page
            window.location.href = "../";
            console.log("user logged out successfully");
        }
        catch(error)
        {
            //message is displayed in case of error
            console.error("Error logging out", error.message);
        }
    }
        //function returns the JSX to be displayed on the screen
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
            <div className = "text-x1 mb-4">
              {/*Using a ternary operator to print the user message if user exists because if..else not supported by JSX 
              , this essentially says if currentUser is logged in, say hello to the current users display name (from register), else say nothing*/}
              {currUser ? (
                <h1>Hey {currUser.displayName}! You're successfully logged in</h1>
              ) : (
                <h1></h1>
              )}
            </div>
            {/*if the button is pressed, logouthandler is called*/}
            <button className="mt-2 w-full bg-foreground text-background py-2 rounded-lg font-semibold hover:bg-[#383838] dark:hover:bg-[#ccc]" onClick={LogoutHandler}>Logout</button>
            </div>
            </main>
            </div>
          );
    }
export default Greeting