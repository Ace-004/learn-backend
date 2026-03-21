import React from "react";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/useAuth";

const Landing = () => {
  const {
    openLogin,
    openRegister,
    isModalOpen,
    setIsModalOpen,
    mode,
    setMode,
  } = useAuth();
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>landing page</h1>
      <button onClick={openLogin}>login</button>
      <button onClick={openRegister}>register</button>
      <AuthModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        mode={mode}
        setMode={setMode}
      />
    </div>
  );
};

export default Landing;
