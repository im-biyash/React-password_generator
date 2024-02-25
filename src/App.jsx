import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setcharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useref hook

  const passwordRef = useRef(null);
  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current.select();
  };

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*()";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, characterAllowed, passwordGenerator]);

  return (
    <>
      <div className="max-w-md mx-auto my-8 rounded-lg shadow-md px-4 py-3 text-white bg-gray-600">
        <h1 className="text-center text-black-700 text-4xl text-bold "> password Generator</h1>
        <div className="flex shadow-sm rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none
        w-full px-3 py-1  "
          />
          <button onClick={copyPassword}>Copy</button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <label htmlFor="passwordLength">Length</label>
            <input
              type="range"
              id="passwordLength"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              ref={passwordRef}
              onChange={(e) => setLength(parseInt(e.target.value))}
            />
            <span>{length}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              name=""
              id=""
              onChange={(e) => setNumberAllowed((prev) => !prev)}
            />
            <label htmlFor="numbers">Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={characterAllowed}
              name=""
              id=""
              onChange={(e) => setcharacterAllowed((prev) => !prev)}
            />
            <label htmlFor="numbers">characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
