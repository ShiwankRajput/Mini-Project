// Define calorie burn rates (per minute)
const calorieRates = {
    Running: 10, // kcal per minute
    Cycling: 8,  // kcal per minute
    Walking: 4,  // kcal per minute
};

let totalCaloriesBurned = 0;
let activityData = {
    Running: 0,
    Cycling: 0,
    Walking: 0,
};

// Initialize the chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Running', 'Cycling', 'Walking'],
        datasets: [{
            label: 'Calories Burned',
            data: [0, 0, 0],
            backgroundColor: 'rgba(75, 192, 192, 0.5)', /* Light teal for chart */
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 500, // Set a maximum value for better visualization
                ticks: {
                    color: '#fff', // Set y-axis ticks color to white
                },
            },
            x: {
                ticks: {
                    color: '#fff', // Set x-axis ticks color to white
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff', // Set legend text color to white
                },
            },
        },
    }
});

// Function to track activity
function trackActivity() {
    const activity = document.getElementById("activity").value;
    const duration = document.getElementById("duration").value;
    const calories = calorieRates[activity] * duration;

    // Update total calories burned
    totalCaloriesBurned += calories;
    activityData[activity] += calories;

    // Update calories burned on the page
    document.getElementById("calories").textContent = totalCaloriesBurned;

    // Update chart data
    myChart.data.datasets[0].data = [activityData.Running, activityData.Cycling, activityData.Walking];
    myChart.update();

    // Optional: Alert for a goal reached
    if (totalCaloriesBurned >= 500) {
        alert("Congrats! You've burned your goal of 500 kcal!");
        totalCaloriesBurned = 0; // Reset after goal
        activityData = { Running: 0, Cycling: 0, Walking: 0 }; // Reset activity data
        myChart.data.datasets[0].data = [0, 0, 0];
        myChart.update();
    }
}
