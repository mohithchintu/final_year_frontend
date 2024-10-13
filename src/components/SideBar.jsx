import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip } from "@fortawesome/free-solid-svg-icons";

const SideBar = ({
  handleClear,
  handleGenerateSSS,
  handleAuthenticate,
  droppedDevices,
}) => {
  return (
    <div className="flex flex-col">
      <p className="flex justify-center items-center font-semibold text-2xl py-3">
        TOOLS
      </p>
      <div className="border-b border-black" />
      <div className="flex flex-col py-3">
        <div
          className="flex justify-center items-center border border-black rounded-sm py-2"
          draggable
        >
          <FontAwesomeIcon icon={faMicrochip} className="mr-2" />
          Device
        </div>
      </div>

      <p className="flex justify-center items-center font-semibold text-2xl py-3 mt-10">
        FUNCTIONS
      </p>
      <div className="border-b border-black" />

      <button
        className="mt-4 py-2 px-4 bg-blue-500 text-white rounded"
        onClick={() => handleGenerateSSS(droppedDevices)}
      >
        Generate SSS
      </button>

      <button
        className="mt-4 py-2 px-4 bg-green-500 text-white rounded"
        onClick={() => handleAuthenticate(droppedDevices)}
      >
        Authenticate
      </button>

      <button
        className="mt-4 py-2 px-4 bg-red-500 text-white rounded"
        onClick={handleClear}
      >
        Clear Devices
      </button>
    </div>
  );
};

export default SideBar;
