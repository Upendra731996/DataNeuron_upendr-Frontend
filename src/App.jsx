import React,{useState} from 'react';
import './index.css'; 
import ResizableComponent01 from './components/ResizableComponent01';
import ResizableComponent02 from './components/ResizableComponent02';
import ResizableComponent03 from './components/ResizableComponent03';



const App = () => {
  
  



  return (
    <div className="app">
      <ResizableComponent01 backgroundColor="lightblue"  >
        
      </ResizableComponent01>

      <ResizableComponent02    >
      
      </ResizableComponent02>
      <ResizableComponent03 backgroundColor="lightyellow"  >
        <h2>Component 3</h2>
        <p>This is the content of Component 3.</p>
      </ResizableComponent03>
    </div>
  );
};

export default App;
