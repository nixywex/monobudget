import React from "react";

import "./Loader.css";

const Loader: React.FC = () => {
  return (
    <div className={"loader"}>
      <div className='loader__lds-ellipsis'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
