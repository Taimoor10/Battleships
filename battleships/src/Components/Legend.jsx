import React from 'react';
import '../Styles/Legend.css';

export const Legend = () => {
  return (
    <div className="legend">
        <div className="legend-item">
          <div className="legend-color legend-hit"></div>
          <span>Hit</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-miss"></div>
          <span>Miss</span>
        </div>
        <div className="legend-item">
          <div className="legend-color legend-sink"></div>
          <span>Sink</span>
        </div>
      </div>
  )
}
