import React, { useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { CSVLink } from 'react-csv';

const MyApp = () => {
  const [histogramData, setHistogramData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://www.terriblytinytales.com/test.txt');
      const content = response.data;
      const words = content.toLowerCase().match(/\b\w+\b/g); // Extract words using regex
      const wordCount = {};
      words.forEach((word) => {
        wordCount[word] = (wordCount[word] || 0) + 1; // Count word occurrences
      });
      const sortedWords = Object.entries(wordCount).sort((a, b) => b[1] - a[1]); // Sort words by frequency
      const top20Words = sortedWords.slice(0, 20); // Get the top 20 words
      const histogram = top20Words.map(([word, count]) => ({ word, count }));
      setHistogramData(histogram);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setIsLoading(false);
  };

  const exportToCSV = () => {
    const csvData = histogramData.map(({ word, count }) => ({ Word: word, Count: count }));
    return csvData;
  };

  return (
    <div>
      <button onClick={fetchData} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
      {histogramData.length > 0 && (
        <div>
          <Bar
            data={{
              labels: histogramData.map((data) => data.word),
              datasets: [
                {
                  label: 'Word Frequency',
                  data: histogramData.map((data) => data.count),
                  backgroundColor: 'rgba(75,192,192,0.6)',
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                  precision: 0,
                },
              },
            }}
          />
          <CSVLink data={exportToCSV()} filename="histogram_data.csv">
            Export
          </CSVLink>
        </div>
      )}
    </div>
  );
};

export default MyApp;
