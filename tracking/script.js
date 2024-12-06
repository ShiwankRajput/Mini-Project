// Initialize theme toggle functionality
const themeToggleBtn = document.getElementById('themeToggleBtn');
const body = document.body;

themeToggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark-theme');
  body.classList.toggle('light-theme');
  themeToggleBtn.textContent = body.classList.contains('dark-theme') ? '🌙 Dark Theme' : '☀️ Light Theme';
});

// Activity Tracker
function trackActivity() {
  const activity = prompt("Enter the activity you did (e.g., Running, Cycling):");
  const duration = prompt("How long did you do it (in minutes)?");
  document.getElementById('activityDetails').innerText = `Activity: ${activity}, Duration: ${duration} minutes`;
}

// Sleep Tracker
function trackSleep() {
  const sleepHours = prompt("How many hours did you sleep?");
  document.getElementById('sleepDetails').innerText = `Sleep: ${sleepHours} hours`;
}

// Nutrition Tracker
function trackNutrition() {
  const foodItem = prompt("Enter the food you ate:");
  const calories = prompt("How many calories was it?");
  document.getElementById('nutritionDetails').innerText = `Food: ${foodItem}, Calories: ${calories} kcal`;
}

// Steps Tracker
function trackSteps() {
  const steps = prompt("How many steps did you take today?");
  document.getElementById('stepsDetails').innerText = `Steps: ${steps} steps`;
}

// Hydration Tracker
function trackHydration() {
  const waterIntake = prompt("How many cups of water did you drink today?");
  document.getElementById('hydrationDetails').innerText = `Water: ${waterIntake} cups`;
}

// Weight & BMI Tracker
function trackWeight() {
  const weight = prompt("Enter your weight (in kg):");
  const height = prompt("Enter your height (in cm):");
  const bmi = calculateBMI(weight, height);
  document.getElementById('weightDetails').innerText = `Weight: ${weight} kg, Height: ${height} cm, BMI: ${bmi}`;
}

function calculateBMI(weight, height) {
  height = height / 100; // Convert cm to meters
  const bmi = weight / (height * height);
  return bmi.toFixed(2);
}

// Mood Tracker
function trackMood() {
  const mood = prompt("How do you feel today? (e.g., Happy, Sad, Energized, etc.)");
  document.getElementById('moodDetails').innerText = `Mood: ${mood}`;
}

// Exercise Duration Tracker
function trackExercise() {
  const exerciseType = prompt("What type of exercise did you do?");
  const duration = prompt("How long did you exercise (in minutes)?");
  document.getElementById('exerciseDetails').innerText = `Exercise: ${exerciseType}, Duration: ${duration} minutes`;
}
