import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChangePassword = ({ userId }) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Хук для перехода на другую страницу

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      await axios.put(
        `http://127.0.0.1:5000/api/user/change-password/${userId}`,
        { oldPassword, newPassword }
      );

      setShowModal(true); // Показать модальное окно при успешном изменении пароля
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError("Failed to change password. Please check your credentials.");
    }
  };

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button> {/* Кнопка "Назад" */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Old Password:</label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Change Password</button>
      </form>
      {/* Модальное окно */}
      {showModal && (
        <div className="modal">
          <p>Password changed successfully!</p>
          <button onClick={() => setShowModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;
