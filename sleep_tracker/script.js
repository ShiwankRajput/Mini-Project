// Weekly Sleep Data
const weeklySleepData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            label: "Hours of Sleep",
            data: [7.5, 8, 6.5, 7, 8.5, 6, 7], // Placeholder data
            backgroundColor: "rgba(0, 180, 216, 0.2)",
            borderColor: "#00B4D8",
            borderWidth: 3,
            tension: 0.4,
            fill: true,
        },
    ],
};

// Chart.js Configuration
const config = {
    type: "line",
    data: weeklySleepData,
    options: {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    color: "#EAEAEA",
                },
            },
        },
        scales: {
            x: {
                ticks: {
                    color: "#EAEAEA",
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
            },
            y: {
                ticks: {
                    color: "#EAEAEA",
                },
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                },
                beginAtZero: true,
            },
        },
    },
};

// Initialize the Chart
const ctx = document.getElementById("sleepChart").getContext("2d");
const sleepChart = new Chart(ctx, config);

// Sleep Duration Calculation
document.getElementById("calculate").addEventListener("click", () => {
    const startTime = document.getElementById("start-time").value;
    const endTime = document.getElementById("end-time").value;

    if (!startTime || !endTime) {
        alert("Please enter both sleep and wake-up times!");
        return;
    }

    const start = new Date(`2024-01-01T${startTime}`);
    const end = new Date(`2024-01-01T${endTime}`);

    const duration = (end - start + 86400000) % 86400000;
    const hours = Math.floor(duration / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    document.getElementById("duration").textContent = `${hours}h ${minutes}m`;

    const todayIndex = (new Date().getDay() + 6) % 7;
    weeklySleepData.datasets[0].data[todayIndex] = hours + minutes / 60;
    sleepChart.update();
});
