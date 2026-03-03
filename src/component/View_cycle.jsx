import React, { useContext, useEffect, useState } from 'react'
import { FirebaseContext } from '../context/firebase.jsx'
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'

function View_cycle() {

    const context = useContext(FirebaseContext);
    const db = context.db;
    const [cycle, setCycle] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCycle = async () => {
            const q = query(collection(db, "Lend"), where("present", "==", true));
            const snapShot = await getDocs(q);
            const allCycles = snapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCycle(allCycles);
        }

        fetchCycle();
    }, [db]);

    // console.log(cycle);

    return (
        <div className='w-[97%] h-auto mt-22 mb-10 relative ml-2 md:ml-5 flex flex-col items-center min-h-[34.5rem]'>
            <h1 className='text-2xl md:text-4xl font-bold'>View Available Cycles 🚲</h1>

            {
                cycle ?
                    <div className='h-auto w-full md:w-[90%] mt-10 flex flex-col justify-center items-center gap-10'>
                        {
                            cycle.map((item, idx) => (
                                <div key={idx} className="w-[90%] bg-gray-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-around gap-4 md:gap-12 transition-transform duration-300 transform hover:scale-103 hover:shadow-2xl hover:bg-red-100">
                                    <img
                                        src={item.imgURL}
                                        alt="cycle_IMG"
                                        className="w-60 h-40 md:w-80 md:h-52 rounded-2xl"
                                    />

                                    <div className="grid grid-cols-[auto_1fr] gap-x-2 gap-y-2 text-gray-800 text-sm md:text-base w-full max-w-xl">
                                        <span className="font-semibold">Lender Name :</span> <span className="text-gray-600">{item.name}</span>
                                        <span className="font-semibold">Cycle ID :</span> <span className="text-gray-600">{item.cycleID}</span>
                                        <span className="font-semibold">Cycle Model :</span> <span className="text-gray-600">{item.cycleModel}</span>
                                        <span className="font-semibold">Present Hostel :</span> <span className="text-gray-600">{item.hostel}</span>
                                        <span className="font-semibold">Condition :</span> <span className="text-gray-600">{item.condition}</span>
                                        <span className="font-semibold">Available From :</span> <span className="text-gray-600">{item.available}</span>
                                        <span className="font-semibold">Description :</span> <span className="text-gray-600">{item.notes}</span>
                                    </div>
                                </div>
                            ))
                        }
                        <button
                            onClick={() => {
                                setTimeout(() => {
                                    navigate('/dashboard');
                                }, 200);
                            }}
                            className='relative ml-[45%] md:ml-[77%] cursor-pointer text-[0.9rem] md:text-[1.1rem] hover:text-blue-700'>Back to Dashboard</button>
                    </div>
                    :
                    <h1 className='text-2xl mt-10'>Currently No Available Cycles</h1>
            }
        </div>
    )
}

export default View_cycle;
