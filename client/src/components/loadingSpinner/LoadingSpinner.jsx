import React from "react";
import "../../styles/LoadingSpinner.css"

export default function LoadingSpinner() {
  return (
    <div class="loader">
      <div class="scanner">
        <span>Loading...</span>
      </div>
    </div>
  );
}