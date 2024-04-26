// frontend/src/components/Graph.js

import React from 'react';
import Chart from 'chart.js/auto';

const Graph = ({ historicalPrices }) => {
  // UseEffect to update the graph when historicalPrices change
  React.useEffect(() => {
    // Check if historicalPrices is available
    if (historicalPrices) {
      const labels = Array.from(historicalPrices.keys());
      const data = Array.from(historicalPrices.values());

      // Create a new chart instance
      const ctx = document.getElementById('myChart').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Cryptocurrency Price',
            data: data,
            borderColor: 'rgba(75, 192, 192, 1)',
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

      // Return cleanup function
      return () => myChart.destroy();
    }
  }, [historicalPrices]);

  return (
    <div>
      <h2>Historical Cryptocurrency Prices</h2>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default Graph;