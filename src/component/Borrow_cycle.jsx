import { FirebaseContext } from '@/context/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import React, { use, useContext, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

function Borrow_cycle() {

    const context = useContext(FirebaseContext);
    const auth = context.auth;
    const db = context.db;
    const [hostel, setHostel] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedCycle, setSelectedCycle] = useState(null);
    const [returnDate, setReturnDate] = useState("");
    const [reason, setReason] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null);
            }
        })
    }, []);

    const selectCycle = async () => {
        if (!hostel) return toast.warning("Please select your hostel first.");
        setLoading(true);
        try {
            const q = query(collection(db, "Lend"), where("present", "==", true));
            const snap = await getDocs(q);
            const allCycle = snap.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            const same = allCycle.filter((c) => c.hostel === hostel);
            const other = allCycle.filter((c) => c.hostel !== hostel);

            let selected;
            if (same.length > 0) {
                selected = same[Math.floor(Math.random() * same.length)];
            }
            else if (other.length > 0) {
                selected = other[Math.floor(Math.random() * other.length)];
                toast.info("No cycles available in your hostel. Alloted from another hostel.");
            }
            else {
                toast.error("No cycle available to borrow at the moment.");
                setLoading(false);
                return;
            }

            setSelectedCycle(selected);
            // console.log(selectedCycle);
        }
        catch (err) {
            console.log(err);
            toast.error("Error fetching cycles.");
        }
        setLoading(false);
    };

    const handleBorrow = async () => {
        if (!selectedCycle || !returnDate || !reason) {
            toast.error("Please fill all the details.");
            return;
        }


        try {
            await updateDoc(doc(db, "Lend", selectedCycle.cycleID), {
                present: false,
            });

            await addDoc(collection(db, "Borrowed"), {
                cycleID: selectedCycle.cycleID,
                borrowedBy: user?.displayName || "Anonymous User",
                borrowedOn: new Date().toISOString(),
                expectedReturn: returnDate,
                reason: reason,
                borrowedHostel: hostel,
            });

            toast.success("Cycle borrowed successfully");
            setHostel("");
            setReturnDate("");
            setReason("");
            setSelectedCycle(null);
        }
        catch (err) {
            console.log(err);
            toast.error("Borrowing Failed");
        }
    }

    return (
        <div className='w-[97%] h-auto mt-22 mb-10 relative ml-2 md:ml-5 flex flex-col items-center min-h-[34.5rem]'>
            <h1 className="text-2xl md:text-4xl font-bold mb-6">Borrow Cycle 🚲</h1>

            {!selectedCycle && (
                <div className="w-[90%] md:w-[65%] bg-white p-4 rounded shadow space-y-4">
                    <label className="block">
                        <span className="text-gray-700 text-[17px] md:text-[25px]">Your Current Hostel</span>
                        <select
                            value={hostel}
                            onChange={(e) => setHostel(e.target.value)}
                            className="mt-1 block w-full border rounded p-2" required>
                            <option value="">Select</option>
                            <option value="VS Hall">VS Hall</option>
                            <option value="SD Hall">SD Hall</option>
                            <option value="MV Hall">MV Hall</option>
                            <option value="GDB Hall">GDB Hall</option>
                            <option value="DBA Hall">DBA Hall</option>
                            <option value="MSS Hall">MSS Hall</option>
                            <option value="HB Hall">HB Hall</option>
                            <option value="BF Hall">BF Hall</option>
                            <option value="KMS Hall">KMS Hall</option>
                            <option value="CVR Hall">CVR Hall</option>
                        </select>
                    </label>

                    <button
                        onClick={selectCycle}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Check Available Cycle
                    </button>
                </div>

            )}

            {
                selectedCycle && (

                    <div className="w-[90%] md:w-[70%] mt-6 bg-gray-100 p-5 rounded-xl shadow text-left">
                        <h2 className="text-xl font-bold mb-2">Cycle Allotted:</h2>

                        <div className="flex flex-col md:flex-row items-center">
                            <img
                                src={selectedCycle.imgURL}
                                alt="Cycle"
                                className="w-60 h-36 rounded-xl object-cover"
                            />
                            <div className="ml-5 mt-4 md:mt-0">
                                <p className="text-lg">Model: <span className="text-gray-500">{selectedCycle.cycleModel}</span></p>
                                <p className="text-lg">Cycle ID: <span className="text-gray-500">{selectedCycle.cycleID}</span></p>
                                <p className="text-lg">Owner: <span className="text-gray-500">{selectedCycle.name}</span></p>
                                <p className="text-lg">Hostel: <span className="text-gray-500">{selectedCycle.hostel}</span></p>
                                <p className="text-lg">Condition: <span className="text-gray-500">{selectedCycle.condition}</span></p>
                            </div>
                        </div>

                        <div className="mt-4 space-y-4">
                            <label className="block">
                                <span className="text-gray-700 text-[17px]">Expected Return Date</span>
                                <input
                                    type="date"
                                    className="mt-1 block w-full border rounded p-2"
                                    value={returnDate}
                                    onChange={(e) => setReturnDate(e.target.value)}
                                    required
                                />
                            </label>

                            <label className="block">
                                <span className="text-gray-700 text-[17px]">Reason for Borrowing</span>
                                <textarea
                                    className="mt-1 block w-full border rounded p-2"
                                    placeholder="E.g. going to city / class"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    required
                                ></textarea>
                            </label>

                            <div className="flex gap-4">
                                <button
                                    onClick={handleBorrow}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                                    Confirm Borrow
                                </button>
                                <button
                                    onClick={() => setSelectedCycle(null)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            <button
                onClick={() => {
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 200);
                }}
                className='relative ml-[55%] mt-5 cursor-pointer text-[0.9rem] md:text-[1.1rem] hover:text-blue-700'>Back to Dashboard</button>
        </div>
    )
}

export default Borrow_cycle;
