import React, { useEffect, useState } from "react";
import { getAllContacts } from "../axios";
import AddContactModal from "./AddContactModal";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import EditContactModal from "./EditContactModal";
import ConfirmModal from "./ConfirmModal";

const ContactsTable = () => {
  const [allContacts, setAllContacts] = useState([]);
  const [showAddNewContactModal, setShowAddNewContactModal] = useState(false);
  const [showEditContactModal, setShowEditContactModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");

  const fetchAllContacts = async () => {
    const response = await getAllContacts();
    setAllContacts(() => response?.data?.allContacts);
  };

  useEffect(() => {
    fetchAllContacts();
  }, []);

  const toggleAddContactModal = () => {
    setShowAddNewContactModal(!showAddNewContactModal);
  };

  const toggleEditContactModal = () => {
    setShowEditContactModal(!showEditContactModal);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center mx-auto my-10 w-full max-w-5xl">
        <h1 className="text-3xl font-semibold text-gray-800 py-5">Contacts</h1>
        <div className="overflow-hidden w-full rounded-lg shadow-lg border border-gray-200 bg-white">
          <table className="w-full text-left text-gray-800">
            <thead className="bg-gray-200">
              <tr className="text-lg font-semibold">
                <th className="p-4">Name</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allContacts?.length > 0 ? (
                allContacts.map((item) => (
                  <tr
                    key={item._id}
                    className="odd:bg-gray-100 even:bg-gray-50 border-t border-gray-200"
                  >
                    <td className="p-4 text-base">{item.Name}</td>
                    <td className="p-4 text-base">{item.Phone_Number}</td>
                    <td className="p-4 flex justify-center gap-4 text-blue-500 cursor-pointer">
                      <span
                        onClick={() => {
                          setShowEditContactModal(true);
                          setSelectedId(item._id);
                        }}
                        className="hover:underline"
                      >
                        Edit
                      </span>
                      <span
                        onClick={() => {
                          setShowDeleteModal(true);
                          setSelectedId(item._id);
                        }}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-6 text-center text-gray-500">
                    No contacts found. Click "Add New" to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Add New Contact Button */}
        <button
          className="mt-8 px-6 py-3 rounded-md bg-[#613f75] text-white font-medium  transition"
          onClick={toggleAddContactModal}
        >
          Add New
        </button>
      </div>

      {/* Modals */}
      {showAddNewContactModal && (
        <Modal
          open={showAddNewContactModal}
          onClose={toggleAddContactModal}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <Box sx={style}>
            <AddContactModal
              toggleAddContactModal={toggleAddContactModal}
              fetchAllContacts={fetchAllContacts}
            />
          </Box>
        </Modal>
      )}
      {showEditContactModal && (
        <Modal
          open={showEditContactModal}
          onClose={toggleEditContactModal}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <Box sx={style}>
            <EditContactModal
              toggleEditContactModal={toggleEditContactModal}
              fetchAllContacts={fetchAllContacts}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
            />
          </Box>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          open={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        >
          <Box sx={style}>
            <ConfirmModal
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              setShowDeleteModal={setShowDeleteModal}
              fetchAllContacts={fetchAllContacts}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ContactsTable;
