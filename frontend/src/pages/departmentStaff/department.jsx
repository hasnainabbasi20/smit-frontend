import { useState } from "react";
import Swal from "sweetalert2";

const StaffForm = () => {
  const [token, setToken] = useState("");
  const [beneficiaryInfo, setBeneficiaryInfo] = useState(null);
  const [status, setStatus] = useState("In Progress");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);
  const [results, setResults] = useState("");

  const fetchBeneficiaryInfo = async () => {
    if (!token.trim()) {
      setError("Token is required to retrieve beneficiary info.");
      return;
    }
    setError("");

    try {
      const response = await fetch("http://localhost:5000/auth/departmentStaff", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tokenNo: token }),
      });

      const result = await response.json();
      if (response.ok) {
        setBeneficiaryInfo(result.userData);
        setError("");
      } else {
        setBeneficiaryInfo(null);
        setError(result.message || "Failed to fetch beneficiary info.");
      }
    } catch (error) {
      console.error("Error fetching beneficiary info:", error);
      setError("Server error. Please try again later.");
    }
  };

  const handleDownloadReceipt = () => {
    const receiptContent = `Receipt\n\nToken Number: ${token}\nStatus: ${status}\nRemarks: ${remarks}\n\nBeneficiary Information:\nName: ${beneficiaryInfo?.name}\nAddress: ${beneficiaryInfo?.address}\nCNIC: ${beneficiaryInfo?.cnic}\nAssistance Type: ${beneficiaryInfo?.assistanceType}`;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `Receipt_${token}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!remarks.trim()) {
      Swal.fire("Remarks are required before submitting.");
      return;
    }

    try {
      const payload = {
        userId: beneficiaryInfo?._id,
        remarks,
        updateStatus: status,
      };

      const response = await fetch("http://localhost:5000/auth/userClear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        setShowReceipt(true);
        Swal.fire("Assistance details updated successfully!");
        setToken("");
        setBeneficiaryInfo(null);
        setRemarks("");
        setStatus("In Progress");
      } else {
        Swal.fire(result.message || "Failed to update assistance details.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire("An error occurred. Please try again later.");
    }
  };

  const seeGeneratedToken = async () => {
    try {
      const response = await fetch("http://localhost:5000/someEndpoint", { method: "GET" });
      const result = await response.json();
      setResults(result);
    } catch (error) {
      console.error("Error fetching token:", error);
      setResults(null);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        padding: "1rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "600px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "1.5rem",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#374151" }}>Department Staff Form</h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <div>
            <label style={{ color: "#6b7280", marginBottom: "0.5rem" }}>Scan Token</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter token"
                required
                style={{ flex: "1", padding: "0.5rem", borderRadius: "4px" }}
              />
              <button type="button" onClick={fetchBeneficiaryInfo} style={{ padding: "0.5rem 1rem" }}>Retrieve Info</button>
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          {beneficiaryInfo && (
            <div>
              <p><strong>Name:</strong> {beneficiaryInfo.name}</p>
              <p><strong>Address:</strong> {beneficiaryInfo.address}</p>
              <p><strong>CNIC:</strong> {beneficiaryInfo.cnic}</p>
              <p><strong>Assistance Type:</strong> {beneficiaryInfo.assistanceType}</p>
            </div>
          )}

          <div>
            <label>Update Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: "100%", padding: "0.5rem", borderRadius: "4px" }}
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label>Remarks</label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks or actions taken"
              rows={4}
              style={{ width: "100%", padding: "0.5rem" }}
            ></textarea>
          </div>

          <button type="submit" style={{ padding: "0.5rem 1rem" }}>Update Assistance</button>
        </form>

        {showReceipt && (
          <div>
            <h3>Receipt</h3>
            <p><strong>Token Number:</strong> {token}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Remarks:</strong> {remarks}</p>

            {beneficiaryInfo && (
              <div>
                <p><strong>Name:</strong> {beneficiaryInfo.name}</p>
                <p><strong>Address:</strong> {beneficiaryInfo.address}</p>
                <p><strong>CNIC:</strong> {beneficiaryInfo.cnic}</p>
                <p><strong>Assistance Type:</strong> {beneficiaryInfo.assistanceType}</p>
              </div>
            )}

            <button onClick={handleDownloadReceipt} style={{ marginTop: "1rem" }}>Download Receipt</button>
            
          </div>
        )}

        {results && (
         
          <div>
             <button onClick={seeGeneratedToken} style={{ marginTop: "1rem" }}>See Generated Token</button>
            <p>Token Number: {FormData.tokenNo}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffForm;
