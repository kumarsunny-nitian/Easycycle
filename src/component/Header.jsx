import React, { use, useContext, useEffect, useState } from 'react'
import '../styles/style_header.css'
import { Link, useNavigate } from 'react-router-dom'
import { FirebaseContext } from '../context/firebase.jsx'
import { onAuthStateChanged, signOut } from 'firebase/auth';

function Header() {

    const context = useContext(FirebaseContext);

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(context.auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
        })
    }, []);

    return (
        <div className="header ml-2 md:ml-[1.5rem]">
            <Link to={'/'}>
                <h1 className='logoname text-[1rem] md:text-[1.4rem] lg:text-[1.9rem]'>eASYCYCLE</h1>
            </Link>

            <div className="navbar gap-2 md:gap-4 lg:gap-8">
                <Link to={'/about'}>
                    <h1 className='text-[1rem] md:text-[1.1rem] lg:text-[1.2rem]'>About</h1>
                </Link>

                <Link to={'/faqs'}>
                    <h1 className='text-[1rem] md:text-[1.1rem] lg:text-[1.2rem]'>FAQs</h1>
                </Link>
            </div>

            {
                user ?
                    <div className='flex justify-center items-center gap-4 w-auto h-auto'>
                        <h1 className='hidden md:block lg:block font-bold text-black text-[1.3rem] font-[cursive]'>Hello, {user?.displayName}</h1>
                        <button className='signinbtn w-auto h-auto p-1 text-[0.8rem] md:p-1.5 lg:p-2 md:text-[1rem] lg:text-[1.1rem]' onClick={() => {
                            signOut(context.auth);
                        }}>Log Out</button>
                    </div>
                    :
                    <button className='signinbtn w-auto h-auto p-1 text-[0.8rem] md:p-1.5 lg:p-2 md:text-[1rem] lg:text-[1.1rem]' onClick={() => {
                        context.signIn();
                    }}>Sign In</button>
            }
        </div>
    )
}

export default Header;
