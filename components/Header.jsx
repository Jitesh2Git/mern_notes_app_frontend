import React from "react";
import { ProfileInfo, SearchBar } from ".";

const Header = ({ userInfo, onSearchNote, handleClearSearch, onDelete }) => {
  return (
    <header
      className="bg-white flex items-center
    justify-between px-6 py-2 drop-shadow max-sm:flex-col"
    >
      <h2
        className="text-xl font-medium 
      text-black py-2"
      >
        NoteEase
      </h2>
      {userInfo && (
        <div
          className="flex items-center gap-20 max-md:gap-10
        max-sm:flex-col max-sm:gap-3"
        >
          <SearchBar
            onSearchNote={onSearchNote}
            handleClearSearch={handleClearSearch}
          />
          <ProfileInfo userInfo={userInfo} onDelete={onDelete} />
        </div>
      )}
    </header>
  );
};

export default Header;
