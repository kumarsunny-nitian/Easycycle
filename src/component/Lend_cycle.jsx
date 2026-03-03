import React, { useContext, useState } from 'react'
import { FirebaseContext } from '../context/firebase.jsx'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from "sonner"
import { useNavigate } from 'react-router-dom'

function Lend_cycle() {

	const [lend, setLend] = useState([]);
	const [loading, setLoading] = useState(false);
	const [imgURL, setimgURL] = useState();
	const context = useContext(FirebaseContext);
	const db = context.db;
	const navigate = useNavigate();

	const handleFileInput = async (e) => {
		setLoading(true);
		e.preventDefault();
		const file = e.target.files[0];
		if (!file) return;

		const data = new FormData();
		data.append("file", file);
		data.append("upload_preset", "project_easycycle");
		data.append("cloud_name", "dwl4cbysu");

		const res = await fetch("https://api.cloudinary.com/v1_1/dwl4cbysu/upload", {
			method: "POST",
			body: data
		});

		const uploadURL = await res.json();
		setimgURL(uploadURL.url);
		setLoading(false);

		// console.log(imgURL);
		// console.log(file[0]);
	}

	const handleOnChange = (mname, value) => {
		setLend({
			...lend,
			[mname]: value
		})
	}

	const handleOnSubmit = async (e) => {
		e.preventDefault();
		const dataToUpload = {
			...lend,
			"present": true,
			"imgURL": imgURL
		};
		try {
			await setDoc(doc(db, "Lend", lend.cycleID), dataToUpload);
			console.log("Document added successful");
			toast.success("Cycle Added Successfully to the List...");

			setTimeout(() => {
				navigate("/dashboard");
			}, 1000);

		} catch (error) {
			console.log("Failed to add document");
			toast.error("Failed to add Cycle, Please Try again...");
		}
	}

	// console.log(lend);

	return (
		<div className='w-[97%] h-auto mt-22 mb-10 relative ml-2 md:ml-5 flex flex-col items-center min-h-[37rem]'>
			<h1 className='text-2xl md:text-4xl font-bold'>Lend Cycle Form 🚲</h1>

			<form
				onSubmit={handleOnSubmit}
				className="w-[90%] md:w-[65%] mt-5 p-4 shadow-xl rounded space-y-4">
				<label className="block">
					<span className="text-gray-700 text-[17px] md:text-[25px]">Owner Name</span>
					<input
						onChange={(e) => {
							handleOnChange("name", e.target.value);
						}}
						type="text" name="ownerName" className="mt-1 block w-full border rounded p-2" placeholder="John Doe" required />
				</label>

				<label className="block">
					<span className="text-gray-700 text-[17px] md:text-[25px]">Cycle ID / Serial Number</span>
					<input
						onChange={(e) => {
							handleOnChange("cycleID", e.target.value);
						}}
						type="text" name="cycleId" className="mt-1 block w-full border rounded p-2" placeholder="CYC12345" required />
				</label>

				<label className="block">
					<span className="text-gray-700 text-[17px] md:text-[25px]">Cycle Model</span>
					<input
						onChange={(e) => {
							handleOnChange("cycleModel", e.target.value);
						}}
						type="text" name="cycleModel" className="mt-1 block w-full border rounded p-2" placeholder="Hero Sprint 24T" required />
				</label>

				<label className="block">
					<span className="text-gray-700 text-[17px] md:text-[25px]">Condition</span>
					<select
						onChange={(e) => {
							handleOnChange("condition", e.target.value);
						}}
						name="condition" className="mt-1 block w-full border rounded p-2" required>
						<option value="">Select</option>
						<option value="Excellent">Excellent</option>
						<option value="Good">Good</option>
						<option value="Needs Repair">Needs Repair</option>
					</select>
				</label>

				<label className="block">
					<span className="text-gray-700 text-[17px] md:text-[25px]">Hostel</span>
					<select
						onChange={(e) => {
							handleOnChange("hostel", e.target.value);
						}}
						name="hostel" className="mt-1 block w-full border rounded p-2" required>
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

				<label className="block">
					<span className="text-gray-700 text-[17px] md:text-[25px]">Available From</span>
					<input
						onChange={(e) => {
							handleOnChange("available", e.target.value);
						}}
						type="date" name="availableFrom" className="mt-1 block w-full border rounded p-2" required />
				</label>

				<label className="block">
					<span className="text-gray-700 text-[17px] md:text-[25px]">Additional Notes</span>
					<textarea
						onChange={(e) => {
							handleOnChange("notes", e.target.value);
						}}
						name="notes" className="mt-1 block w-full border rounded p-2" placeholder="Any special instructions or info..."></textarea>
				</label>

				<label className="block">
					<span className="text-gray-700 text-[17px] md:text-[25px]">Cycle Image</span>
					<input
						onChange={handleFileInput}
						type="file" name="cycleImage" accept="image/*" className="mt-1 block w-full border-2 border-blue-500 text-blue-700 bg-blue-50 rounded p-2 cursor-pointer hover:bg-blue-100 transition" required />
				</label>

				<button
					type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
					Submit Cycle for Lending
				</button>
			</form>

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

export default Lend_cycle;
