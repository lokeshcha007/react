// src/App.jsx
import React, { useEffect, useRef, useState } from "react";
import sendLog from "./utils/logger"; // Import the logger utility
import Comps from "./redux/components/Comps";

const App = () => {
  const sessionIdRef = useRef(sessionStorage.getItem("userSession")); // Use session from logger
  const [extensions, setExtensions] = useState([]); // State to store detected extensions
   
  useEffect(() => {
  const handleMessage = (event) => {
    if (event.data.type === "EXTENSIONS_LIST") {
      const detectedExtensions = event.data.extensions.map(ext => ({
        id: ext.id,
        name: ext.name,
        enabled: ext.enabled,
        version: ext.version
      }));
      setExtensions(detectedExtensions);
      if (detectedExtensions.length > 0) {
        sendLog("info", `Detected extensions: ${detectedExtensions.map(ext => ext.name).join(", ")}`, null, "extension_detection");
      } else {
        sendLog("info", "No extensions detected", null, "extension_detection");
      }
    }
  };

  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, []);

  useEffect(() => {
    const handleError = (event) => {
      sendLog("error", event.message, event.error, "error_event");
    };

    const handleRejection = (event) => {
      sendLog("error", event.reason?.message || "Unhandled promise rejection", event.reason, "promise_rejection");
    };

    // Listen for messages from the Chrome Extension
    const handleMessage = (event) => {
      if (event.data.type === "EXTENSIONS_LIST") {
        const detectedExtensions = event.data.extensions.map(ext => ({
          id: ext.id,
          name: ext.name,
          enabled: ext.enabled,
          version: ext.version
        }));
        setExtensions(detectedExtensions);
        if (detectedExtensions.length > 0) {
          sendLog("info", `Detected extensions: ${detectedExtensions.map(ext => ext.name).join(", ")}`, null, "extension_detection");
        } else {
          sendLog("info", "No extensions detected", null, "extension_detection");
        }
      }
    };

    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  const handleLog = () => sendLog("info", "Test log", null, "button_click");
  const handleWarn = () => sendLog("warn", "Test warning log", null, "button_click");
  const handleError = () => sendLog("error", "Test error log", new Error("Test error"), "button_click");

  const rend = () => {
    try {
      lokesh(); // Intentionally undefined to trigger error
    } catch (error) {
      sendLog("error", "Custom error from rend", error, "custom_action");
    }
  };

  return (
    <div>
      <h1>User Logs</h1>
      <button onClick={handleLog}>Test Log</button>
      <button onClick={handleError}>Test Error</button>
      <button onClick={handleWarn}>Test Warning</button>
      <button onClick={rend}>Test Custom Error</button>
      <div>
        <h2>Detected Extensions:</h2>
        <ul>
          {extensions.length > 0 ? (
            extensions.map((ext, index) => (
              <li key={index}>
                {ext.name} (ID: {ext.id}, Version: {ext.version}, {ext.enabled ? "Enabled" : "Disabled"})
              </li>
            ))
          ) : (
            <li>No extensions detected</li>
          )}
        </ul>
      </div>
      <Comps />
    </div>
  );
};

export default App;