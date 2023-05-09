import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './App.css'
function App() {
  const [data, setData] = useState(null);
  const [disabled, setDisabled] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true); 
    const response = await axios.get('https://www.terriblytinytales.com/test.txt');
    const text = response.data.trim();
    const words = text.split(/[\s.,]+/);
    const wordCounts = {};
    for (const word of words) {
      if (word in wordCounts) {
        wordCounts[word]++;
      } else {
        wordCounts[word] = 1;
      }
    }
    const sortedWordCounts = Object.entries(wordCounts).sort((a, b) => b[1] - a[1]).slice(0, 20);
    setData(sortedWordCounts);
  };

  const handleExport = () => {
    const csvData = data.map(([word, count]) => `${word},${count}`).join('\n');
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'word-frequency.csv');
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    let chart = null;
    if (data) {
      const canvas = document.getElementById('chart');
      if (Chart.getChart(canvas)) {
        Chart.getChart(canvas).destroy();
      }
      chart = new Chart(canvas, {
        type: 'bar',
        data: {
          labels: data.map(([word]) => word),
          datasets: [{
            label: 'Word Frequency',
            data: data.map(([_, count]) => count),
            backgroundColor: 'rgba(200, 199, 199, 0.8)',
            borderColor: 'rgba(70, 70, 70, 0.8)',
            borderWidth: 2
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      });
    }
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [data]);

  return (
      <div> 
      <center>
      <h1>Hello Terribly Tiny Tales!</h1>
      <h4>I am Sakshi Saini and I just created a histogram fetching data from 'https://www.terriblytinytales.com/test.txt' displaying the Top 20 most frequent words!! Click on Submit to have a view! </h4>
      <form onSubmit={handleSubmit}>
        <button class="button button2" type="submit" disabled={disabled}>Submit</button>
      </form>
      {data && (
        <>
          <canvas id="chart" style={{ width: '80px', height: '20px' }}></canvas>
          <button class="button button2" onClick={handleExport}>Click here to export these words in an Excel File</button>
        </>
      )}
      </center>
     </div>
  );
}

export default App;
