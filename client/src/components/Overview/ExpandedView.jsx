import React from "react";
function ExpandedView({ image }) {
  return (
    <div>
      <img style={{ height: "100%", width: "100%" }} src={image}></img>
    </div>
  );
}

export default ExpandedView;
