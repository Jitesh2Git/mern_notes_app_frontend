"use client";

import { AddEditNotes, EmptyCard, Header, NoteCard } from "@/components";
import { AddNotesImg, NoDataImg } from "@/public";
import axiosInstance from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdAdd } from "react-icons/md";
import ReactModal from "react-modal";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

  const handleEdit = (noteData) => {
    setOpenAddEditModal({ isShown: true, type: "edit", data: noteData });
  };

  //Get User API Call
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data && response.data.user) {
        setUserInfo(response.data.user);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
      } else {
        console.error("An error occurred:", error);
      }
    }
  };

  //Get All Notes API Call
  const getAllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");

      if (response.data && response.data.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log("An unexpected error occured. Please try again.");
    }
  };

  //Delete Note API Call
  const deleteNote = async (data) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId);

      if (response.data && !response.data.error) {
        toast.success("Note Deleted Successfully.");
        getAllNotes();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occured. Please try again.");
      }
    }
  };

  //Search Notes API Call
  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });

      if (response.data && response.data.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Update isPinned Value API Call
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteId,
        {
          isPinned: !noteData.isPinned,
        }
      );

      if (response.data && response.data.note) {
        if (noteData.isPinned == false) {
          toast.success("Note Pinned Successfully.");
        } else {
          toast.success("Note Unpinned Successfully.");
        }

        getAllNotes();
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Delete Account API Call
  const onDelete = async () => {
    try {
      const response = await axiosInstance.delete("/delete-account");

      if (response.data && !response.data.error) {
        toast.success("Account Deleted Successfully.");
        console.log("Account and all associated notes deleted successfully.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 1000);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        console.log("An unexpected error occurred. Please try again.");
      } else {
        console.log(
          "Network error. Please check your connection and try again."
        );
      }
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  useEffect(() => {
    getUserInfo();
    getAllNotes();

    return () => {};
  }, []);

  return (
    <main className="bg-slate-100 h-screen">
      <Header
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
        onDelete={onDelete}
      />
      <div className="max-w-[90%] mx-auto">
        {allNotes.length > 0 ? (
          <div
            className="grid grid-cols-3 gap-4 mt-8 pb-14
          max-lg:grid-cols-2 max-sm:grid-cols-1"
          >
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdOn}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard
            imgSrc={isSearch ? NoDataImg : AddNotesImg}
            message={
              isSearch
                ? "Oops! No data found matching your search."
                : `Start creating your first note! Click the 'Add' 
                button to jot down your thoughts, ideas and reminders. 
                Let's get started.`
            }
          />
        )}
      </div>
      <button
        className="w-16 h-16 flex items-center justify-center
      rounded-lg bg-primary hover:bg-blue-600 fixed
      right-5 bottom-5 max-lg:size-14 max-md:size-12 
      max-sm:size-10 lg:rounded-2xl"
        onClick={() =>
          setOpenAddEditModal({ isShown: true, type: "add", data: null })
        }
      >
        <MdAdd className="text-[32px] text-white" />
      </button>
      <ReactModal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgb(0,0,0,0.2)",
          },
        }}
        ariaHideApp={false}
        className="w-[40%] max-h-3/4 rounded-md mx-auto mt-14 p-5
        bg-white max-xl:w-[50%] max-lg:w-[70%] max-sm:w-[90%]"
      >
        <AddEditNotes
          type={openAddEditModal.type}
          noteData={openAddEditModal.data}
          onClose={() =>
            setOpenAddEditModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
        />
      </ReactModal>
    </main>
  );
};

export default Home;
