import { useState } from 'react';
import Histogram from './Histogram';

function TrithemiusCipher() {

    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    const [Time, setTime] = useState(<div></div>);


    const encrypt = (text: string) => {
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char.match(/[a-zA-Z]/)) {
                const isUpperCase = char === char.toUpperCase();
                const charCode = char.charCodeAt(0);
                const shift = i % 26; // Determine the shift based on the position in the text
                let encryptedCharCode = charCode + shift;
                if (isUpperCase && encryptedCharCode > 90) {
                    encryptedCharCode -= 26;
                } else if (!isUpperCase && encryptedCharCode > 122) {
                    encryptedCharCode -= 26;
                }
                result += String.fromCharCode(encryptedCharCode);
            } else {
                result += char;
            }
        }
        setEncryptedText(result);
        setDecryptedText(text);
    };

    const decrypt = (text: string) => {

        let result = '';
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            if (char.match(/[a-zA-Z]/)) {
                const isUpperCase = char === char.toUpperCase();
                const charCode = char.charCodeAt(0);
                const shift = i % 26; // Determine the shift based on the position in the text
                let decryptedCharCode = charCode - shift;
                if (isUpperCase && decryptedCharCode < 65) {
                    decryptedCharCode += 26;
                } else if (!isUpperCase && decryptedCharCode < 97) {
                    decryptedCharCode += 26;
                }
                result += String.fromCharCode(decryptedCharCode);
            } else {
                result += char;
            }
        }
        setDecryptedText(result);
        setEncryptedText(text);
    };


    const estimateTime = () => {
        const numIterations = 1000;
        let encryptTotalTime = 0;
        let decryptTotalTime = 0;

        for (let iter = 0; iter < numIterations; iter++) {
            let startTime = performance.now();
            encrypt(decryptedText);
            let endTime = performance.now();
            encryptTotalTime += endTime - startTime;

            startTime = performance.now();
            decrypt(encryptedText);
            endTime = performance.now();
            decryptTotalTime += endTime - startTime;
        }

        const averageEncryptTime = (encryptTotalTime / numIterations).toFixed(3)
        const averageDecryptTime = (decryptTotalTime / numIterations).toFixed(3)

        setTime(
            <div>
                <h1>{"Encrypt took (Average) = " + averageEncryptTime + " milliseconds"}</h1>
                <h1>{"Decrypt took (Average) = " + averageDecryptTime + " milliseconds"}</h1>
            </div>
        );
    }


    return (
        <div className='text-xl flex flex-col justify-center items-center'>
            <h2 className='mb-2 text-center font-bold '>Trithemius Cipher</h2>

            <div className='mb-2'>
                <button className='mr-2 mb-2' >Text :  </button>
                <input className='text-center text-[#000] p-2' type="text" placeholder="Enter text to encrypt" value={decryptedText} onChange={(e) => encrypt(e.target.value)} />
            </div>


            <div className='mb-2'>
                <button className='mr-2 mb-2'>Encrypted Text:</button>
                <input className='text-center text-[#000] p-2' type="text" placeholder="Enter text to decrypt" value={encryptedText} onChange={(e) => decrypt(e.target.value)} />
            </div>

            <Histogram text1={decryptedText} text2={encryptedText} />

            <div className=' cursor-pointer mt-2 bg-[green] p-2 rounded-lg' onClick={() => estimateTime()}>Get time</div>
            {Time}

        </div>
    );
}

export default TrithemiusCipher;
