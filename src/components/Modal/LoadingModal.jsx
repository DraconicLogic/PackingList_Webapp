import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadingModal = () => {
  return (
    <div id="loading-modal" display="true">
      <span className="spinner">
        <CircularProgress />
      </span>
    </div>
  );
};

export default LoadingModal;
