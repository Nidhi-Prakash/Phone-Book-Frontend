import React from "react";
import { deleteContact } from "../axios";

const ConfirmModal = ({
  selectedId,
  setSelectedId,
  setShowDeleteModal,
  fetchAllContacts,
}) => {
  const handleDelete = async () => {
    const result = await deleteContact(selectedId);
    setShowDeleteModal(false);
    if (result.status === 200) {
      fetchAllContacts();
      setSelectedId("");
    }
  };

  return (
    <div
      className="border border-gray-300 shadow-lg bg-white flex flex-col justify-center items-center w-[320px] p-6 rounded-lg"
      data-aos="fade-in"
    >
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Are you sure you want to delete this contact?
      </h2>
      <div className="flex justify-between w-full gap-4">
        <button
          className="flex-1 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          onClick={handleDelete}
        >
          Yes
        </button>
        <button
          className="flex-1 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
          onClick={() => setShowDeleteModal(false)}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default ConfirmModal;
