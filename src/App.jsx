import { useState, useCallback, useEffect, useRef } from 'react'


function App() {
  const [length, setlength] = useState(6);
  const [numallowed, setnumonoff] = useState(false);
  const [charallowed, setcharonoff] = useState(false);

  const [password, setpassword] = useState("");

  const passwordgenerator = useCallback(() => {
    let pass1 = "";
    let str1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numallowed == true) {
      str1 += ("0123456789")
    }
    if (charallowed == true) {
      str1 += "!@#$%^&*()-+`"
    }
    for (let i = 1; i <= length; i++) {
      pass1 += str1.charAt(Math.floor(Math.random() * str1.length + 1));
    }
    setpassword(pass1);

  }, [length, numallowed, password, charallowed])

  useEffect(() => {
    passwordgenerator()
  }, [length, numallowed, charallowed, setpassword])


  const passwordref = useRef(null)

  const copyPasswordToClipboard = useCallback(() => {
    passwordref.current?.select();
    passwordref.current?.setSelectionRange(0,999)
    window.navigator.clipboard.writeText(password)
  
  }, [password])


  return (
    <>
      <div className="w-full max-w-xl mx-auto shadow-md rounded-lg my-5 p-2 pl-1 text-orange-200 bg-gray-600 ">
        <h1 className="text-center mb-3 text-2xl">Password Generator</h1>
        <div className="overflow-hidden mb-4 flex rounded-lg ml-4">
          <input type="text"
            className="w-full py-1 px-3 outline-none text-black"
            readOnly
            value={password}
            placeholder='Password'
            ref={passwordref}
          />
          <input type="button" value="Copy" className="text-white ml-0 mr-4 bg-orange-400 rounded-r-lg px-2 py-2 shadow-none transition-transform duration-300 hover:scale-105 focus:scale-105"


            onClick={copyPasswordToClipboard}
          />
        </div>
        <div className='flex gap-x-3 text-md ml-4 pb-2'>
          <div className="flex items-center gap-x-1">
            <input type="range"
              value={length}
              min={6}
              max={100}
              className="cursor-pointer self-center "
              onChange={(e) => setlength(e.target.value)}
            />
            <label className="text-lg">Length: {length}</label>
          </div>
          <div className="flex gap-x-1">
            <input type="checkbox" className="w-4 h-4 self-center"
              defaultChecked={numallowed}
              id="numberInput"
              onChange={() => setnumonoff((prev) => !prev)}
            />
            <label className="text-lg">Numbers</label>
          </div>
          <div className="flex gap-x-1">
            <input type="checkbox" className="w-4 h-4 self-center"
              defaultChecked={charallowed}
              id="charInput"
              onChange={() => setcharonoff((prev) => !prev)}
            />
            <label className="text-lg">Special Characters</label>
          </div>

        </div>

      </div>

    </>
  )
}

export default App
