import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../context/firebase.jsx'
import { onAuthStateChanged } from 'firebase/auth'
import user_img from '../assets/user_img.jpg'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

    const context = useContext(FirebaseContext);
    const auth = context.auth;
    const [user, setUser] = useState(null);
    const [img, setImg] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
                setImg(user?.photoURL);
                // console.log(user);
            }
            else {
                setUser(null);
                setImg(null);
            }
        })
    }, []);

    return (
        <div className='w-[97%] h-auto mt-22 relative ml-2 md:ml-5 flex flex-col items-center'>

            <div className='rounded-2xl w-[90%] md:w-[80%] h-auto min-h-[12rem] mt-5 relative flex flex-col items-center justify-center gap-5 p-4 md:flex-row md:justify-evenly md:items-center bg-gray-200 shadow-xl transition-transform duration-200 hover:scale-102'>
                <img src={img || user_img} alt="Profile Image" className=' h-[5rem] rounded-full md:h-[7rem] lg:h-[10rem]' />
                <div className='min-w-[50%] min-h-[10rem] flex flex-col justify-center items-start gap-3'>
                    <h1 className='font-bold text-xl md:text-2xl lg:text-3xl'>Name : {user?.displayName}</h1>
                    <h1 className='text-[1rem] lg:text-2xl'>Email : {user?.email}</h1>
                    <h1 className='text-[1rem] lg:text-2xl'>Hostel : Dhirubhai Ambani Hall of Residence</h1>
                    <h1 className='text-[1rem] lg:text-2xl'>Category : Student</h1>
                </div>
            </div>

            <h1 className='relative mt-10 font-bold text-4xl'>Services</h1>

            <div className='mt-10  h-auto w-full md:w-[95%] grid sm:grid-cols-1 md:grid-cols-2 justify-items-center items-center'>
                <div
                    onClick={() => {
                        setTimeout(() => {
                            navigate('/dashboard/borrow_cycle');
                        }, 200);
                    }}
                    className='h-[17rem] w-[90%] max-w-[21rem] md:w-[21rem] lg:w-[28rem] mb-10 rounded-2xl hover:shadow-2xl bg-red-200 flex flex-col justify-center items-center text-center transition-transform duration-200 hover:scale-102 cursor-pointer'>
                    <h1 className='font-bold text-2xl mb-5'>Borrow Cycle 🚲</h1>
                    <p>Easily borrow a cycle by <br /> selecting from the available <br /> list and checking it out in seconds.</p>
                </div>
                <div
                    onClick={() => {
                        setTimeout(() => {
                            navigate('/dashboard/lend_cycle');
                        }, 200);
                    }}
                    className='h-[17rem] w-[90%] max-w-[21rem] md:w-[21rem] lg:w-[28rem] mb-10 rounded-2xl hover:shadow-2xl bg-blue-200 flex flex-col justify-center items-center text-center transition-transform duration-200 hover:scale-102 cursor-pointer'>
                    <h1 className='font-bold text-2xl mb-5'>Lend Cycle 🔁</h1>
                    <p>List your cycle for others to <br /> use and contribute to a smarter, <br /> shared campus commute.</p>
                </div>
                <div
                    onClick={() => {
                        setTimeout(() => {
                            navigate('/dashboard/repair_cycle');
                        }, 200);
                    }}
                    className='h-[17rem] w-[90%] max-w-[21rem] md:w-[21rem] lg:w-[28rem] mb-10 rounded-2xl hover:shadow-2xl bg-green-100 flex flex-col justify-center items-center text-center transition-transform duration-200 hover:scale-102 cursor-pointer'>
                    <h1 className='font-bold text-2xl mb-5'>Repair Cycle 🛠️</h1>
                    <p>Report issues and send damaged <br /> cycles for repair to keep the <br /> system running smoothly.</p>
                </div>
                <div
                    onClick={() => {
                        setTimeout(() => {
                            navigate('/dashboard/view_cycle');
                        }, 200);
                    }}
                    className='h-[17rem] w-[90%] max-w-[21rem] md:w-[21rem] lg:w-[28rem] mb-10 rounded-2xl hover:shadow-2xl bg-yellow-100 flex flex-col justify-center items-center text-center transition-transform duration-200 hover:scale-102 cursor-pointer'>
                    <h1 className='font-bold text-2xl mb-5'>View All cycle 📋</h1>
                    <p>Browse all registered cycles <br /> with live availability and <br /> maintenance status at a glance.</p>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
