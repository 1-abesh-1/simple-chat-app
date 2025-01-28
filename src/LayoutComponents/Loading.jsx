import React from 'react'
import '../themes/Loading.css'
export default function Loading() {
    return (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      );
}
