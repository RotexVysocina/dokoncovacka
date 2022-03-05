import React, {Component, useEffect, useState} from "react";

function Skinner() {

  useEffect(() => {
    const hostFull = window.location.host;
    const host = hostFull.split(".")[0];
    let backgroundColor; // default for ev...

    switch (host) {
      case "ev":
        backgroundColor = "#088cb3"; // light blue
        break;
      case "dev":
        backgroundColor = "#b37070"; // red
        break;
      case "sev":
        backgroundColor = "#5fb15e"; // green
        break;
      default:
        backgroundColor = "#1a578a" // dark blue
    }

    document.body.style.backgroundColor = backgroundColor;
  }, [])

  return(
  ""
  )
}

export default Skinner;