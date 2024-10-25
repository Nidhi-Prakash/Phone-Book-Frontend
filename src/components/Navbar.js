import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-[#613f75] flex justify-between items-center px-5 py-3 shadow-md">
      <div className="text-white text-[24px] font-bold">Phonebook</div>
      <button
        onClick={handleLogout}
        className="text-white bg-[#EF4444] py-2 px-4 rounded hover:bg-red-500 transition duration-200"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
