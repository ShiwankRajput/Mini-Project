// Initialize an array to store weight data and dates
let weightHistory = [];
let dateHistory = [];

// Function to calculate BMI
function calculateBMI() {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  
  if (height && weight) {
    const heightInMeters = height / 100;
    const bmi = weight / (heightInMeters * heightInMeters);
    const result = bmi.toFixed(2);
    
    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi >= 18.5 && bmi <= 24.9) category = 'Normal weight';
    else if (bmi >= 25 && bmi <= 29.9) category = 'Overweight';
    else category = 'Obesity';
    
    document.getElementById("bmi-result").innerHTML = `Your BMI: ${result} - ${category}`;
  } else {
    alert("Please enter both height and weight.");
  }
}

// Function to track weight and update chart
function trackWeight() {
  const currentWeight = document.getElementById("current-weight").value;
  
  if (currentWeight) {
    const currentDate = new Date().toLocaleDateString();
    
    // Add current weight and date to the histories
    weightHistory.push(currentWeight);
    dateHistory.push(currentDate);
    
    updateWeightChart();
  } else {
    alert("Please enter your current weight.");
  }
}

// Initialize Chart.js chart for weight tracking
const ctx = document.getElementById('weightChart').getContext('2d');
let weightChart = new Chart(ctx, {
  type: 'line', // Line chart type
  data: {
    labels: dateHistory, // Dates on X-axis
    datasets: [{
      label: 'Weight (kg)',
      data: weightHistory, // Weight data on Y-axis
      borderColor: '#ff6f61', // Line color
      backgroundColor: 'rgba(255, 111, 97, 0.3)', // Line area color
      borderWidth: 2,
      fill: true,
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Date'
        }
      },
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Weight (kg)'
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        mode: 'index',
        intersect: false,
      }
    }
  }
});

// Function to update the chart whenever a new weight is tracked
function updateWeightChart() {
  weightChart.data.labels = dateHistory; // Update date labels
  weightChart.data.datasets[0].data = weightHistory; // Update weight data
  weightChart.update(); // Refresh the chart
}
