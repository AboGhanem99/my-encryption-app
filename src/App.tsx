import { useState } from 'react';
import CaesarCipher from './CaesarCipher';
import TrithemiusCipher from './TrithemiusCipher';


function App() {
  const [selectedCipher, setSelectedCipher] = useState('caesar'); // Initial selection

  const handleCipherToggle = (cipher: 'caesar' | 'trithemius') => {
    setSelectedCipher(cipher);
  };

  return (
    <div className='bg-[#000] text-[#fff] flex flex-col gap-5 w-screen h-screen pt-4 items-center '>

      <div>
          <button className='bg-[red] p-4 font-bold rounded-2xl mr-4' onClick={() => handleCipherToggle('caesar')}>Caesar Cipher</button>
          <button className='bg-[red] p-4 font-bold rounded-2xl mr-4' onClick={() => handleCipherToggle('trithemius')}>Trithemius Cipher</button>
        </div>

        {selectedCipher === 'caesar' ? <CaesarCipher /> : <TrithemiusCipher />}
    </div>
  );
}

export default App;
