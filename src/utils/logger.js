// src/utils/logger.js
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Initialize userSession (only set if not already present)
const userSession = sessionStorage.getItem("userSession") || uuidv4();
if (!sessionStorage.getItem("userSession")) {
  sessionStorage.setItem("userSession", userSession);
}

// Browser detection function (synchronous)
const detectBrowser = () => {
  const userAgent = navigator.userAgent;

  // Check for Brave using its special property
  if (navigator.brave?.isBrave) {
    return "Brave";
  }

  // Check for other browsers using userAgent
  if (userAgent.includes("Firefox")) {
    return "Mozilla Firefox";
  } else if (userAgent.includes("Edg")) {
    return "Microsoft Edge";
  } else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) {
    return "Safari";
  } else if (userAgent.includes("Chrome")) {
    return "Google Chrome";
  } else {
    return "Unknown";
  }
};

const sendLog = async (level, message, error = null, action = "none") => {
  const logId = uuidv4();
  const timestamp = new Date().toISOString();
  const page = window.location.href;
  const userAgent = navigator.userAgent;
  const userBrowser = detectBrowser(); // Call the synchronous function

  let stack = "";
  let file = "";
  let line = "";

  if (error?.stack) {
    stack = error.stack;
    const match = error.stack.match(/at\s.+\((.*):(\d+):(\d+)\)/);
    if (match) {
      file = match[1].split("/").pop();
      line = match[2];
    }
  }

  const log = {
    logId,
    level,
    message,
    timestamp,
    userSession,
    page,
    userAgent,
    stack,
    file,
    line,
    actions: action,
    userBrowser,
  };

  try {
    await axios.post("http://localhost:5000/logs", log);
  } catch (err) {
    console.warn("Failed to send log:", err);
  }
};

export default sendLog;