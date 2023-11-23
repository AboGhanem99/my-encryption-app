import { useState } from 'react';
import Histogram from './Histogram';

function CaesarCipher() {

    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');
    const a: number = 7;
    const b: number = 10;

    const [Time, setTime] = useState(<div></div>);


    const encrypt = (text: string) => {
        text = text.toUpperCase()
        let cipher = "";
        for (let i = 0; i < text.length; i++) {

            if (text[i] != ' ')
                cipher = cipher + String.fromCharCode((((a * (text[i].charCodeAt(0) - 65)) + b) % 26) + 65);
            else
                cipher += text[i];
        }
        setEncryptedText(cipher);
        setDecryptedText(text)
    }

    const decrypt = (text: string) => {
        text = text.toUpperCase()
        let msg = "";
        let a_inv = 0;
        let flag = 0;

        for (let i = 0; i < 26; i++) {
            flag = (a * i) % 26;
            if (flag == 1) {
                a_inv = i;
            }
        }
        for (let i = 0; i < text.length; i++) {
            if (text[i] != ' ')

                msg = msg + String.fromCharCode(((a_inv * ((text[i].charCodeAt(0) + 65 - b)) % 26)) + 65);
            else
                msg += text[i];
        }
        setDecryptedText(msg);
        setEncryptedText(text);
    }

    const estimateTime = () => {
        const numIterations = 1000; // Number of iterations for better accuracy
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
            <h2 className='mb-2 text-center font-bold'>Caesar Cipher</h2>

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

export default CaesarCipher;
