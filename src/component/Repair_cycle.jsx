import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../context/firebase.jsx'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

function getVisTime(isUrgent) {
    const now = new Date();

    if (isUrgent) {
        const urgentDate = new Date(now.getTime() + 2 * 60 * 60 * 1000);
        return changeVisTime(urgentDate, "(Urgent)");
    }
    else {
        const next = new Date(now);
        next.setDate(next.getDate() + 1);
        next.setHours(10, 0, 0, 0);
        return changeVisTime(next, "");
    }
}

function changeVisTime(dateObj, suffix = "") {
    const visitTime = dateObj.toLocaleString("en-IN", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
    }) + (suffix ? `${suffix}` : "");

    const visitDate = dateObj.toISOString();
    return { visitTime, visitDate };
}

function Repair_cycle() {

    const context = useContext(FirebaseContext);
    const db = context.db;
    const [repair, setRepair] = useState({
        cycleID: "",
        issue: "",
        hostel: "",
        isUrgent: false,
    });
    const [visTime, setVisTime] = useState(null);
    const [fault, setFault] = useState([]);
    const navigate = useNavigate();

    const handleOnChange = (field, value) => {
        setRepair({
            ...repair,
            [field]: value
        });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        const { visitTime, visitDate } = getVisTime(repair.isUrgent);

        const dataToUpload = {
            ...repair,
            dateReported: serverTimestamp(),
            status: "Pending",
            visitTime: visitTime,
            visitDate: visitDate,
        };

        try {
            await addDoc(collection(db, "Repairs"), dataToUpload);
            toast.success(`Repair request submitted! Visit Shop by ${visitTime}.`);

            setVisTime(visitTime);
            setFault(dataToUpload);

            setRepair({
                cycleID: "",
                issue: "",
                hostel: "",
                isUrgent: false,
            });

            console.log(fault);
            console.log(visTime);
        }
        catch (err) {
            console.log("Failed to submit request : ", err);
            toast.error('Failed to submit repair request. Please try again.');
        }
    };

    return (
        <div className='w-[97%] h-auto mt-22 mb-10 relative ml-2 md:ml-5 flex flex-col items-center min-h-[34.5rem]'>
            <h2 className="text-xl md:text-2xl font-bold">🔧 Report Cycle for Repair</h2>
            <form
                onSubmit={handleOnSubmit}
                className="w-[95%] md:w-[65%] mt-5 p-4 shadow-xl rounded space-y-4">

                <label className="block">
                    <span className="text-gray-700 text-[17px] md:text-[25px]">Cycle ID</span>
                    <input
                        onChange={(e) => {
                            handleOnChange("cycleID", e.target.value);
                        }}
                        type="text"
                        name="cycleID"
                        placeholder="Enter your Cycle ID"
                        className="mt-1 block w-full border rounded p-2"
                        required
                    />
                </label>

                <label className="block">
                    <span className="text-gray-700 text-[17px] md:text-[25px]">Issue Description</span>
                    <textarea
                        onChange={(e) => {
                            handleOnChange("issue", e.target.value);
                        }}
                        name="issue"
                        placeholder="Describe the problem with your cycle"
                        className="mt-1 block w-full border rounded p-2"
                        required
                    ></textarea>
                </label>

                <label className="block">
                    <span className="text-gray-700 text-[17px] md:text-[25px]">Hostel</span>
                    <select
                        onChange={(e) => {
                            handleOnChange("hostel", e.target.value);
                        }}
                        name="hostel"
                        className="mt-1 block w-full border rounded p-2"
                        required
                    >
                        <option value="">Select Hostel</option>
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

                <label className="block">
                    <span className="text-gray-700 text-[17px] md:text-[25px]">Mark as Urgent</span>
                    <div className="mt-2">
                        <input
                            type="checkbox"
                            name="isUrgent"
                            className="mr-2"
                            onChange={(e) => {
                                handleOnChange("isUrgent", e.target.value);
                            }}
                        />
                        <span className="text-gray-600">This issue needs quick attention</span>
                    </div>
                </label>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Submit Repair Request
                </button>
            </form>

            {
                visTime ?
                    <>
                        <h1 className='text-xl md:text-2xl font-bold mt-5'>Repair Time Slot</h1>
                        <div className='w-auto h-auto mt-5 p-5 rounded-2xl bg-gray-200 shadow-2xl'>
                            <h1 className='md:text-xl'>CycleID : {fault.cycleID}</h1>
                            <h1 className='md:text-xl'>Hostel : {fault.hostel}</h1>
                            <h1 className='md:text-xl'>Issue : {fault.issue}</h1>
                            <h1 className='md:text-xl font-bold'>Visit Date and Time : {visTime}</h1>
                        </div>
                    </>
                    :
                    <div></div>
            }

            <button
                onClick={() => {
                    setTimeout(() => {
                        navigate('/dashboard');
                    }, 200);
                }}
                className='relative mt-5 ml-[45%] md:ml-[53%] cursor-pointer text-[0.9rem] md:text-[1.1rem] hover:text-blue-700'>Back to Dashboard</button>

        </div>
    )
}

export default Repair_cycle;
