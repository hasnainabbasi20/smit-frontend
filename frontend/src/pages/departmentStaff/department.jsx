
import { useState } from "react";
import Swal from "sweetalert2";

const StaffForm = () => {
  const [token, setToken] = useState("");
  const [beneficiaryInfo, setBeneficiaryInfo] = useState(null);
  const [status, setStatus] = useState("In Progress");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");
  const [showReceipt, setShowReceipt] = useState(false);

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
      console.log("token add=>>",result)
      if (response.ok) {
        setBeneficiaryInfo(result.userData);
        setError("");
      } else {
        setBeneficiaryInfo(null);
        setError(result.message || "Failed to fetch beneficiary info");
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
      Swal.fire("Remarks are required before submitting.")
      return;
    }
  
    try {
      // Construct the payload
      const payload = {
        userId: beneficiaryInfo?._id, // Ensure `beneficiaryInfo` has a `_id` field
        remarks,
        updateStatus: status,
      };
  
      // Make the API call
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
        alert("Assistance details updated successfully!");
        setToken("");
        setBeneficiaryInfo(null);
        setRemarks("");
        setStatus("In Progress");
      } else {
        // Handle API errors
        alert(result.message || "Failed to update assistance details.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    }
  };
  

    console.log({
      token,
      status,
      remarks,
      beneficiaryInfo,
    });

    Swal.fire("Assistance details updated successfully!");
    setToken("");
    setBeneficiaryInfo(null);
    setRemarks("");
    setStatus("In Progress");

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
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            marginBottom: "1rem",
            color: "#374151",
          }}
        >
          Department Staff Form
        </h2>
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem" }}>
          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.5rem",
                color: "#6b7280",
              }}
            >
              Scan Token
            </label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter token"
                required
                style={{
                  flex: "1",
                  padding: "0.5rem",
                  border: "1px solid #d1d5db",
                  borderRadius: "4px",
                }}
              />
              <button
                type="button"
                onClick={fetchBeneficiaryInfo}
                style={{
                  padding: "0.5rem 1rem",
                  backgroundColor: "#3b82f6",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Retrieve Info
              </button>
            </div>
            {error && (
              <p style={{ color: "red", fontSize: "0.875rem", marginTop: "0.5rem" }}>
                {error}
              </p>
            )}
          </div>

          {beneficiaryInfo && (
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#f3f4f6",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
              }}
            >
              <p style={{ fontSize: "0.875rem", color: "#374151" }}>
                <strong>Name:</strong> {beneficiaryInfo.name}
              </p>
              <p style={{ fontSize: "0.875rem", color: "#374151" }}>
                <strong>Address:</strong> {beneficiaryInfo.address}
              </p>
              <p style={{ fontSize: "0.875rem", color: "#374151" }}>
                <strong>CNIC:</strong> {beneficiaryInfo.cnic}
              </p>
              <p style={{ fontSize: "0.875rem", color: "#374151" }}>
                <strong>Assistance Type:</strong> {beneficiaryInfo.purpose}
              </p>
            </div>
          )}

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.5rem",
                color: "#6b7280",
              }}
            >
              Update Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
              }}
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontSize: "0.875rem",
                fontWeight: "500",
                marginBottom: "0.5rem",
                color: "#6b7280",
              }}
            >
              Remarks
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Enter remarks or actions taken"
              rows={4}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #d1d5db",
                borderRadius: "4px",
              }}
            ></textarea>
          </div>

          <div style={{ textAlign: "right" }}>
            <button
              type="submit"
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#3b82f6",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Update Assistance
            </button>
          </div>
        </form>

        {showReceipt && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              backgroundColor: "#f9fafb",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
            }}
          >
            <h3 style={{ fontSize: "1rem", color: "#374151" }}>Receipt</h3>
            <p style={{ fontSize: "0.875rem", color: "#374151" }}>
              <strong>Token Number:</strong> {token}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#374151" }}>
              <strong>Status:</strong> {status}
            </p>
            <p style={{ fontSize: "0.875rem", color: "#374151" }}>
              <strong>Remarks:</strong> {remarks}
            </p>
            {beneficiaryInfo && (
              <div>
                <p style={{ fontSize: "0.875rem", color: "#374151" }}>
                  <strong>Name:</strong> {beneficiaryInfo.name}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#374151" }}>
                  <strong>Address:</strong> {beneficiaryInfo.address}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#374151" }}>
                  <strong>CNIC:</strong> {beneficiaryInfo.cnic}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#374151" }}>
                  <strong>Assistance Type:</strong> {beneficiaryInfo.purpose}
                </p>
              </div>
            )}
            <button
              onClick={handleDownloadReceipt}
              style={{
                marginTop: "1rem",
                padding: "0.5rem 1rem",
                backgroundColor: "#10b981",
                color: "#ffffff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Download Receipt
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StaffForm;

