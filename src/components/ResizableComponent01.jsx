import React, { useEffect, useState } from 'react';
import '../index.css'; // Import your CSS file for styling

const ResizableComponent = ({ children, backgroundColor,key}) => {
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(600);
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

      // =============
      
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };
  // ========== resizable for all component======

  


  return (
    <div className="resizable-component" style={{ width: `${width}px`, height: `${height}px`, backgroundColor: backgroundColor }}>
      {isResizing && <div className="resize-overlay" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}></div>}
      <div className="resize-handle" onMouseDown={handleMouseDown}></div>
      <div className="content">
        {children}
      </div>
      <img src='https://images.unsplash.com/photo-1459802071246-377c0346da93?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3BsYXNofGVufDB8fDB8fHww'  style={{}}></img>

    </div>
  );
};

export default ResizableComponent;
