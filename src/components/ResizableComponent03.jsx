import React, { useState } from 'react';
import '../index.css'; // Import your CSS file for styling

const ResizableComponent = ({ children, backgroundColor }) => {
  const [width, setWidth] = useState(1500);
  const [height, setHeight] = useState(200);
  const [isResizing, setIsResizing] = useState(false);

  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsResizing(true);
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e) => {
    if (isResizing) {
      setWidth(e.clientX);
      setHeight(e.clientY);
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="resizable-component" style={{ width: `${width}px`, height: `${height}px`, backgroundColor: backgroundColor }}>
      {isResizing && <div className="resize-overlay" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}></div>}
      <div className="resize-handle" onMouseDown={handleMouseDown}></div>
      <div className="content">
        {children}
      </div>
    </div>
  );
};

export default ResizableComponent;
