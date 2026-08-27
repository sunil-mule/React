import React, { useState } from 'react';

function WorkingCounter() {
  const [count, setCount] = useState(0); // Notice we use 'const' now

  function handleClick() {
    //  RIGHT: Telling React to update the state and refresh the UI
    setCount(count + 1); 
  }

  return (
    <button onClick={handleClick}>Count: {count}</button>
  );
}

export default WorkingCounter;