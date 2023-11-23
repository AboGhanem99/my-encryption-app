import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

interface HistogramProps {
  text1: string;
  text2: string;
}

const Histogram: React.FC<HistogramProps> = ({ text1, text2 }) => {
  const combinedText = text1 + text2;
  const uniqueChars = Array.from(new Set(combinedText)).filter((char) => char.match(/[a-zA-Z]/));
  const alphabet = uniqueChars.join('');

  const generateHistogramData = (text: string, label: string, backgroundColor: string) => {
    const charFrequency: Record<string, number> = {};

    for (const char of text) {
      if (char.match(/[a-zA-Z]/)) {
        if (charFrequency[char]) {
          charFrequency[char]++;
        } else {
          charFrequency[char] = 1;
        }
      }
    }

    const labels = Array.from(alphabet);
    const data = labels.map((char) => charFrequency[char] || 0);

    return {
      label,
      data,
      backgroundColor: `rgba(${backgroundColor})`,
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    };
  };

  const data1 = generateHistogramData(text1, 'Text ', '75, 192, 192, 0.2');
  const data2 = generateHistogramData(text2, 'Encrypted Text', '192, 75, 75, 0.2');

  return (
    <div className=''>
      <Bar className='bg-[#fff] '
        data={{
          labels: Array.from(alphabet),
          datasets: [data1, data2],
        }}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default Histogram;
