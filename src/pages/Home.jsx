import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrochip, faTrash } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [droppedDevices, setDroppedDevices] = useState([]);
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [output, setOutput] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const device = {
      name: e.dataTransfer.getData("device"),
      id: Date.now() + Math.floor(Math.random() * 1000000000),
    };
    setDroppedDevices((prevDevices) => [...prevDevices, device]);
  };

  const handleDelete = (index) => {
    setDroppedDevices((prevDevices) =>
      prevDevices.filter((_, i) => i !== index)
    );
  };

  const handleClear = () => {
    setDroppedDevices([]);
    setSelectedDevices([]);
  };

  const handleDeviceSelect = (deviceId) => {
    if (selectedDevices.includes(deviceId)) {
      setSelectedDevices(selectedDevices.filter((id) => id !== deviceId));
    } else {
      setSelectedDevices([...selectedDevices, deviceId]);
    }
  };

  const handleGenerateSSS = async (devices) => {
    if (devices.length < 3) {
      alert("Please select at least 3 devices for polynomial generation.");
      return;
    }
    const secretkey = Date.now() + Math.floor(Math.random() * 1000000000);
    const deviceIds = devices.map((device) => device.id);
    console.log(deviceIds, secretkey);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ deviceIds, secretkey }),
      });
      const result = await response.json();
      console.log("Generated SSS:", result);
    } catch (error) {
      console.error("Error generating SSS:", error);
    }
  };

  const handleAuthenticate = async () => {
    if (selectedDevices.length < 3) {
      alert("Please select at least 3 devices for authentication.");
      return;
    }

    try {
      const response = await fetch("/api/authenticate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedDevices }),
      });
      const result = await response.json();
      setOutput(result.message);
    } catch (error) {
      setOutput("Error authenticating devices.");
      console.error("Error authenticating devices:", error);
    }
  };

  const handleClearOutput = () => {
    setOutput("");
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/5 h-screen p-2 border-r-2 border-black ">
        <SideBar
          handleClear={handleClear}
          handleGenerateSSS={handleGenerateSSS}
          handleAuthenticate={handleAuthenticate}
          droppedDevices={droppedDevices}
        />
      </div>

      <div className="flex flex-col w-4/5 p-2">
        <div className="flex flex-col h-full w-full gap-y-1">
          <div
            className="p-4 h-2/3 w-full border border-black rounded-md"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="flex flex-wrap gap-3">
              {droppedDevices.length === 0 ? (
                <p>Section 1 (Drop your devices here)</p>
              ) : (
                droppedDevices.map((device, index) => (
                  <div
                    key={device.id}
                    className="p-2 border border-blue-500 rounded-md flex items-center"
                  >
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedDevices.includes(device.id)}
                      onChange={() => handleDeviceSelect(device.id)}
                    />
                    <FontAwesomeIcon icon={faMicrochip} className="mr-2" />
                    {`${device.name} ${index + 1} (ID: ${device.id})`}
                    <button
                      className="ml-4 text-red-500"
                      onClick={() => handleDelete(index)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="p-3 w-full flex-1 border border-black rounded-md">
            <p>Output:</p>
            <pre>{output}</pre>
            <button
              className="mt-4 py-2 px-4 bg-red-500 text-white rounded"
              onClick={handleClearOutput}
            >
              Clear Output
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
