import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdPhoneIphone } from "react-icons/md";
import { editContact } from "../axios";

const EditContactModal = ({
  toggleEditContactModal,
  fetchAllContacts,
  selectedId,
  setSelectedId,
}) => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    phoneNumber: "",
  });
  const [showNameError, setShowNameError] = useState(false);
  const [showPhoneError, setShowPhoneError] = useState(false);

  const handleSubmit = async (name, phoneNumber) => {
    if (!name) setShowNameError(true);
    if (!phoneNumber) setShowPhoneError(true);
    if (!name || !phoneNumber) return;

    const result = await editContact(selectedId, name, phoneNumber);
    if (result.status === 200) {
      toggleEditContactModal();
      fetchAllContacts();
      setSelectedId("");
    }
  };

  return (
    <div
      className="border border-gray-300 shadow-lg bg-white flex flex-col justify-center items-center w-[320px] p-6 rounded-lg"
      data-aos="zoom-in"
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Edit Contact
      </h2>
      <div className="flex flex-col mb-4 w-full">
        <div className="relative">
          <input
            type="text"
            name="Name"
            placeholder="Name"
            value={userInfo.name}
            onChange={(e) => {
              setUserInfo({ ...userInfo, name: e.target.value });
              setShowNameError(false);
            }}
            className="w-full focus:outline-none h-[38px] border border-gray-400 rounded-md px-10 text-base bg-transparent placeholder-gray-500"
          />
          <AiOutlineUser className="absolute left-3 top-3 text-gray-500" />
        </div>
        {showNameError && (
          <span className="text-xs text-red-500 mt-1">Name is required!</span>
        )}
      </div>

      <div className="flex flex-col mb-4 w-full">
        <div className="relative">
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={userInfo.phoneNumber}
            onChange={(e) => {
              setUserInfo({ ...userInfo, phoneNumber: e.target.value });
              setShowPhoneError(false);
            }}
            className="w-full focus:outline-none h-[38px] border border-gray-400 rounded-md px-10 text-base bg-transparent placeholder-gray-500"
          />
          <MdPhoneIphone className="absolute left-3 top-3 text-gray-500" />
        </div>
        {showPhoneError && (
          <span className="text-xs text-red-500 mt-1">
            Phone Number is required!
          </span>
        )}
      </div>

      <button
        className="w-full py-2 bg-[#613f75] text-white rounded-md  transition-colors"
        onClick={() => handleSubmit(userInfo.name, userInfo.phoneNumber)}
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditContactModal;
