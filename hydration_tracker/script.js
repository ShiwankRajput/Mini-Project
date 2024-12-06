// Initializing variables
let totalIntake = 0; // Total water consumed (ml)
let dailyGoal = 2000; // Default daily goal (ml)
let intakeHistory = []; // History of water intake in an array
let labels = ['Today']; // Labels for the x-axis
let intakeData = [0]; // Data for the y-axis

// DOM elements
const totalIntakeElement = document.getElementById('total-intake');
const waterIntakeInput = document.getElementById('water-intake');
const progressBar = document.getElementById('progress-bar');
const goalDisplay = document.getElementById('goal-display');
const historyList = document.getElementById('history-list');
const ctx = document.getElementById('hydrationChart').getContext('2d');

// Create the hydration chart using Chart.js (Line chart)
const hydrationChart = new Chart(ctx, {
  type: 'line', // Set the chart type to line
  data: {
    labels: labels, // x-axis labels
    datasets: [{
      label: 'Water Intake (ml)',
      data: intakeData, // Water intake data points
      fill: false,
      borderColor: 'rgba(76, 175, 80, 1)', // Line color
      backgroundColor: 'rgba(76, 175, 80, 0.6)', // Area fill color
      borderWidth: 3,
      tension: 0.4, // Smooth curve for the line
    }, {
      label: 'Goal (ml)',
      data: Array(intakeData.length).fill(dailyGoal), // Create a constant line for the goal
      fill: false,
      borderColor: 'rgba(255, 99, 132, 1)', // Goal line color
      borderWidth: 2,
      borderDash: [5, 5], // Dashed line for the goal
    }],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        max: dailyGoal + 500, // Allow extra space above goal line
        ticks: {
          stepSize: 500,
        },
      },
      x: {
        beginAtZero: true,
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff', // Legend text color
        },
      },
      tooltip: {
        backgroundColor: '#333',
        bodyColor: '#fff',
        titleColor: '#fff',
      },
    },
  },
});

// Function to update the progress bar
function updateProgressBar() {
  const progress = (totalIntake / dailyGoal) * 100;
  progressBar.style.width = `${Math.min(progress, 100)}%`; // Limit to 100% max
}

// Function to add water intake
function addWater() {
  const waterAmount = parseInt(waterIntakeInput.value); // Get the water intake value from input
  if (!isNaN(waterAmount) && waterAmount > 0) {
    totalIntake += waterAmount; // Add the intake to total
    totalIntakeElement.innerText = totalIntake; // Update the total intake on the UI

    // Add the water amount to the history and update labels and data for the chart
    intakeHistory.push(waterAmount);
    labels.push(`+${waterAmount} ml`); // New label for the intake
    intakeData.push(totalIntake); // New data point for the chart

    // Update the hydration chart with the new data
    hydrationChart.data.labels = labels;
    hydrationChart.data.datasets[0].data = intakeData;
    hydrationChart.data.datasets[1].data = Array(intakeData.length).fill(dailyGoal); // Update goal line
    hydrationChart.update(); // Refresh the chart

    // Update the progress bar based on the new total intake
    updateProgressBar();

    // Add the intake to the history list
    updateHistoryList();

    // Clear the input field after adding
    waterIntakeInput.value = '';
  } else {
    alert('Please enter a valid number greater than 0.');
  }
}

// Function to set a custom hydration goal
function setGoal() {
  const newGoal = parseInt(document.getElementById('goal').value); // Get the goal from input
  if (!isNaN(newGoal) && newGoal > 0) {
    dailyGoal = newGoal; // Update the daily goal
    goalDisplay.innerText = dailyGoal; // Update goal display

    // Update the chart with the new goal
    hydrationChart.data.datasets[1].data = Array(intakeData.length).fill(dailyGoal);
    hydrationChart.update();

    updateProgressBar(); // Update progress bar to reflect new goal
  } else {
    alert('Please enter a valid goal greater than 0.');
  }
}

// Function to update the intake history list
function updateHistoryList() {
  historyList.innerHTML = ''; // Clear the current history list
  intakeHistory.forEach(amount => {
    const listItem = document.createElement('li'); // Create a new list item
    listItem.innerText = `${amount} ml`; // Add the water amount to the list item
    historyList.appendChild(listItem); // Append the item to the list
  });
}

// Function to reset the hydration tracker
function resetTracker() {
  totalIntake = 0; // Reset the total intake to 0
  intakeHistory = []; // Clear the history
  dailyGoal = 2000; // Reset the goal to default (2000 ml)
  labels = ['Today']; // Reset labels
  intakeData = [0]; // Reset intake data

  // Update the UI with reset values
  totalIntakeElement.innerText = totalIntake;
  goalDisplay.innerText = dailyGoal;

  // Reset the hydration chart and progress bar
  hydrationChart.data.labels = labels;
  hydrationChart.data.datasets[0].data = intakeData;
  hydrationChart.data.datasets[1].data = Array(intakeData.length).fill(dailyGoal);
  hydrationChart.update();
  progressBar.style.width = '0%';

  // Clear the history list
  updateHistoryList();
}

// Event listener for reset button
document.getElementById('reset-button').addEventListener('click', resetTracker);
