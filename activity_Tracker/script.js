// Calorie burn rates per minute
const calorieRates = {
    Running: 10,  // kcal per minute
    Cycling: 8,   // kcal per minute
    Walking: 4,   // kcal per minute
};

let totalCaloriesBurned = 0;
let activityData = {
    Running: 0,
    Cycling: 0,
    Walking: 0,
};

// Initialize chart
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Running', 'Cycling', 'Walking'],
        datasets: [{
            label: 'Calories Burned',
            data: [0, 0, 0],
            backgroundColor: '#00bcd4',
            borderColor: '#0098a6',
            borderWidth: 1,
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                max: 500,
                ticks: {
                    color: '#fff',
                },
            },
            x: {
                ticks: {
                    color: '#fff',
                },
            },
        },
    }
});

// Function to track activity
function trackActivity() {
    const activity = document.getElementById("activity").value;
    const duration = document.getElementById("duration").value;
    if (duration > 0) {
        const calories = calorieRates[activity] * duration;

        // Update total calories burned
        totalCaloriesBurned += calories;
        activityData[activity] += calories;

        // Update the displayed calories
        document.getElementById("calories").textContent = totalCaloriesBurned.toFixed(2);

        // Update chart data
        myChart.data.datasets[0].data = [activityData.Running, activityData.Cycling, activityData.Walking];
        myChart.update();
    } else {
        alert("Please enter a valid duration!");
    }
}
