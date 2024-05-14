import React from "react";

function Intro({ heading }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: "20px",
        width: "inherit",
        height: "30px",
        color: "#FFF",
        backgroundColor: "#2B2A2A",
        marginTop: " 10px",
      }}
    >
      {heading}
    </div>
  );
}

export default Intro;
