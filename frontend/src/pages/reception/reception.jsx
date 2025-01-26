import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Reception = () => {
  const generateToken = () => Math.floor(1000 + Math.random() * 9000);
  const [results , setResults] = useState('')
  const [formData, setFormData] = useState({
    cnic: "",
    name: "",
    phone: "",
    address: "",
    purpose: "",
    tokenNo :  generateToken()
  });
   
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a new token before submitting
    const newToken = generateToken();
    setFormData((prev) => ({ ...prev, tokenNo: newToken }));

    console.log("formdata==>>>", { ...formData, tokenNo: newToken });

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, tokenNo: newToken }),
      });

      const result = await response.json();
      console.log("result==>>", result);
       setResults(result)
      if (response.ok) {
        Swal.fire("User registered successfully!");
        console.log("Registered User:", result.name);
  } else {
        Swal.fire(result.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire("Server error. Please try again later.");
    }
  };

  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, purpose: e.target.value });
  };
  
  return (
    <div className="max-w-xl mx-auto mt-8 p-4 border rounded-lg shadow-md">
      <h1 className="text-xl font-bold mb-4">Reception Desk</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">CNIC</label>
        <input
          type="text"
          name="cnic"
          value={formData.cnic}
          onChange={(e) => {
            const inputValue = e.target.value;
            if (inputValue.length <= 13 && /^\d*$/.test(inputValue)) {
              setFormData({ ...formData, cnic: inputValue });
            }
          }}
          placeholder="Enter up to 13 digits"
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Phone Number</label>
        <input
          type="text"
          name="phone"
          placeholder="Enter Phone Number"
          value={formData.phone}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Address</label>
        <input
          type="text"
          name="address"
          placeholder="Enter Address"
          value={formData.address}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Purpose of Visit</label>
        <select
          name="purpose"
          value={formData.purpose}
          onChange={handleSelectChange}
          className="w-full p-2 border rounded"
        >
          <option value="" disabled>
            Select Purpose of Visit
          </option>
          <option value="Financial Aid">Financial Aid</option>
          <option value="Medical Assistance">Medical Assistance</option>
          <option value="Other">Other</option>
        </select>
      </div>

       <button
        onClick={handleSubmit}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Generate Token
      </button>
      {results && (
         <div className="mt-4 bg-green-100 p-4 rounded text-center">
         {results.user.tokenNo}
       </div>
        )}
    </div>
  );
};

export default Reception;
