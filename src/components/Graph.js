import React, { useRef, useEffect } from 'react';
import { DateTime } from 'luxon';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-luxon';

const Graph = ({ historicalPrices }) => {
  const chartRefBitcoin = useRef(null);
  const chartRefEthereum = useRef(null);

  useEffect(() => {
    const createChart = (chartRef, historicalPricesData, title) => {
      if (!chartRef.current || !historicalPricesData) return;

      const labels = [];
      const data = [];

      for (const [timestamp, price] of Object.entries(historicalPricesData)) {
        const date = DateTime.fromMillis(parseInt(timestamp));
        labels.push(date.toISODate());
        data.push(price);
      }

      const ctx = chartRef.current.getContext('2d');

      // Ensure previous chart instance is destroyed
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      // Create new chart instance
      chartRef.current.chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: title,
            data: data,
            borderColor: title === 'Bitcoin' ? 'gold' : 'rgba(54, 162, 235, 1)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            x: {
              type: 'time'
            }
          }
        }
      });
    };

    createChart(chartRefBitcoin, historicalPrices?.bitcoin, 'Bitcoin');
    createChart(chartRefEthereum, historicalPrices?.ethereum, 'Ethereum');
  }, [historicalPrices]);

  return (
    <div className="graph-container">
      <div className="graph-card">
        <h2>Bitcoin Price</h2>
        <canvas ref={chartRefBitcoin}></canvas>
      </div>
      <div className="graph-card">
        <h2>Ethereum Price</h2>
        <canvas ref={chartRefEthereum}></canvas>
      </div>
    </div>
  );
};

export default Graph;
