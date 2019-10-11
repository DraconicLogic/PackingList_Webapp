import React, { useState, useEffect } from "react";
import StackEditor from "./StackEditor";

const StoredBales = ({ stacks, add }) => {
  const [currentStack, setStack] = useState(Array(12));
  const [code, setCode] = useState({
    firstDigit: "",
    secondDigit: "",
    thirdDigit: ""
  });

  useEffect(() => {
    startFocus();
  }, []);

  const handleInput = event => {
    const { value, id } = event.target;
    const newCode = { ...code };

    if (newCode[id]) newCode[id] = null;

    newCode[id] = value;

    setCode(newCode);
    moveFocus(id);
  };

  const startFocus = () => {
    document.getElementById("firstDigit").focus();
  };

  const clearFields = () => {
    document.getElementById("three-digit-code").reset();
  };

  const moveFocus = id => {
    let nextElement;
    switch (id) {
      case "firstDigit":
        nextElement = "secondDigit";
        break;
      case "secondDigit":
        nextElement = "thirdDigit";
        break;
      case "thirdDigit":
        nextElement = "retrive-stack";
        break;
      default:
    }
    document.getElementById(nextElement).focus();
  };

  const clearStack = () => {
    setStack(Array(12));
  };

  const handleAddToContainer = () => {
    add(currentStack);
    clearStack();
    clearFields();
    startFocus();
  };

  const retrieveStack = ({ firstDigit, secondDigit, thirdDigit }) => {
    const formattedCode = firstDigit + secondDigit + thirdDigit;
    if (stacks[formattedCode]) {
      setStack(stacks[formattedCode]);
    } else {
      alert(
        `The stack: ${formattedCode} does not appear to be in the database`
      );
      clearFields();
    }
  };

  return (
    <div>
      <h1>STORED</h1>
      <form onChange={handleInput} id="three-digit-code">
        <input
          id="firstDigit"
          className="code-input"
          type="text"
          maxLength="1"
        />

        <input
          id="secondDigit"
          className="code-input"
          type="text"
          maxLength="1"
        />
        <input
          id="thirdDigit"
          className="code-input"
          type="text"
          maxLength="1"
        />
      </form>

      <button id="retrive-stack" onClick={() => retrieveStack(code)}>
        Retreive Stack
      </button>
      <button onClick={() => clearFields()}>CLEAR FIELDS</button>
      <div id="stack-section">
        <StackEditor stack={currentStack} />
        <div id="stack-options">
          <button onClick={handleAddToContainer}>Add to container</button>
          <button onClick={() => clearStack()}>Clear Stack</button>
        </div>
      </div>
    </div>
  );
};

export default StoredBales;