// Function to update the health bar

// JavaScript to handle the "Let's Play" button click
document.getElementById("start-game-btn").addEventListener("click", function() {
    // Hide the intro screen
    document.getElementById("intro-screen").style.display = "none";
    
    // Show the game container
    document.querySelector(".container").style.display = "flex";
});

function updateHealthBar(healthPercentage) {
    if (healthPercentage < 0) healthPercentage = 0;
    if (healthPercentage > 100) healthPercentage = 100;

    let healthBar = document.querySelector(".health-bar-fill");
    healthBar.style.width = healthPercentage + "%";
    document.querySelector(".number").textContent = healthPercentage + "/100";

    checkGameOver(); // Check if the game is over after updating health
}

// Function to update status items (coins, apples, laughter, health)
function updateStatusItem(item, change) {
    let itemElement = document.querySelector(`.status-item img[alt="${item}"]`).nextElementSibling;
    let currentValue = parseInt(itemElement.textContent, 10);
    let newValue = currentValue + change;

    // Ensure the value doesn't go below 0
    if (newValue < 0) newValue = 0;

    itemElement.textContent = newValue;

    checkGameOver(); // Check if the game is over after updating any status item
}

// Function to check if the game is over based on the conditions
function checkGameOver() {
    let coins = parseInt(document.querySelector(".status-item img[alt='Coins']").nextElementSibling.textContent, 10);
    let health = parseInt(document.querySelector(".number").textContent.split("/")[0], 10);
    let apples = parseInt(document.querySelector(".status-item img[alt='Apple']").nextElementSibling.textContent, 10);
    let laughter = parseInt(document.querySelector(".status-item img[alt='Laughter']").nextElementSibling.textContent, 10);
    let medicine = parseInt(document.querySelector(".status-item img[alt='Health']").nextElementSibling.textContent, 10);

    // Check if any game over condition is met
    if (coins === 0 || health === 0 || apples === 0 || laughter === 0 || medicine === 0) {
        alert("Game Over! You have lost the game.");
        resetGame(); // Reset the game or reload the page
    }
}

// Function to reset the game (or reload the page)
function resetGame() {
    // Optionally reset all values to their starting points
    location.reload(); // Reload the game to start from the beginning
}

// Handling the question skip
document.getElementById("skip-question").addEventListener("click", function() {
    alert("Question skipped. You lost 5 coins.");
    updateStatusItem("Coins", -5);
    updateStatusItem("Apple", -1);
    updateStatusItem("Laughter", -1);
    updateStatusItem("Health", -1);

    // Move to the next question
    questionSubmitted = false;
    currentQuestionIndex++;
    questionNumber++;

    if (currentQuestionIndex >= questionLibrary.length) {
        currentQuestionIndex = 0;
        questionNumber = 1;
        alert("You have completed all questions! Restarting from the beginning.");
    }

    loadQuestion();
    document.getElementById("submit-btn").textContent = "Submit Answer";
});

// Handling the "Feed Teddy an Apple" button
document.querySelector(".action-item img[alt='Food']").parentElement.addEventListener("click", function() {
    updateStatusItem("Apple", 1); // Increase apple status by 1
    updateStatusItem("Coins", -1); // Decrease coins by 1
});

// Handling the "Make Teddy laugh" button
document.querySelector(".action-item img[alt='Laugh']").parentElement.addEventListener("click", function() {
    updateStatusItem("Laughter", 1); // Increase laughter status by 1
    updateStatusItem("Coins", -1); // Decrease coins by 1
});

// Handling the "Give Teddy medicine" button
document.querySelector(".action-item img[alt='Pill']").parentElement.addEventListener("click", function() {
    updateStatusItem("Health", 1); // Increase health status by 1
    updateStatusItem("Coins", -1); // Decrease coins by 1
});


// Define the library of questions and their answers
const questionLibrary = [
    {
        question: "Dua buah kereta api bergerak pada jalur yang sama... Tentukan jarak antara kedua kereta ketika keduanya telah berhenti bergerak.",
        answer: 98,
        explanation: "The correct answer is 98 because both trains decelerate uniformly, covering equal distances before they stop."
    },
    {
        question: "Sebuah benda bergerak dengan kecepatan konstan. Jika percepatannya 0, tentukan kecepatan awal benda.",
        answer: 0,
        explanation: "The correct answer is 0 because with constant velocity and zero acceleration, the object maintains its speed."
    },
    {
        question: "Jika sebuah bola dilempar ke atas dengan kecepatan awal 10 m/s, berapa ketinggian maksimum yang dicapai bola?",
        answer: 5,
        explanation: "The correct answer is 5 meters, based on the kinematic equation where final velocity at max height is zero."
    },
    {
        question: "Sebuah mobil dengan massa 1000 kg bergerak dengan kecepatan 20 m/s. Hitung energi kinetiknya.",
        answer: 200000,
        explanation: "The correct answer is 200,000 J. The formula for kinetic energy is (1/2) * mass * velocity^2, so (1/2) * 1000 * (20^2) = 200,000 J."
    },
    {
        question: "Sebuah balok bermassa 5 kg diletakkan di atas meja. Berapa gaya normal yang bekerja pada balok?",
        answer: 50,
        explanation: "The correct answer is 50 N. The normal force is equal to the gravitational force, which is mass * gravity. For 5 kg, the force is 5 * 10 = 50 N."
    },
    {
        question: "Sebuah benda jatuh bebas dari ketinggian 80 meter. Jika percepatan gravitasi 10 m/s², berapa waktu yang diperlukan benda tersebut untuk mencapai tanah?",
        answer: 4,
        explanation: "The correct answer is 4 seconds. Using the formula t = sqrt(2h/g), where h = 80 m and g = 10 m/s², we get t = sqrt(160/10) = 4 seconds."
    },
    {
        question: "Jika sebuah pegas memiliki konstanta pegas 200 N/m dan diregangkan sejauh 0,1 meter, berapa besar energi potensial elastisnya?",
        answer: 1,
        explanation: "The correct answer is 1 J. The formula for elastic potential energy is (1/2) * k * x^2, so (1/2) * 200 * (0.1)^2 = 1 J."
    },
    {
        question: "Sebuah roket di luar angkasa bergerak dengan kecepatan konstan. Berapakah gaya total yang bekerja pada roket?",
        answer: 0,
        explanation: "The correct answer is 0 N. In the absence of external forces (as in outer space), the net force on the object is zero if it's moving with constant velocity (Newton's First Law)."
    },
    {
        question: "Sebuah bola ditendang mendatar dengan kecepatan 15 m/s. Jika tidak ada gaya yang bekerja pada bola selain gravitasi, berapa besar percepatan bola secara horizontal?",
        answer: 0,
        explanation: "The correct answer is 0 m/s². In the absence of horizontal forces (ignoring air resistance), there is no horizontal acceleration, so the velocity remains constant."
    },
    {
        question: "Sebuah benda bermassa 10 kg diletakkan di atas bidang miring licin dengan sudut kemiringan 30°. Berapa gaya gravitasi yang bekerja pada benda sepanjang bidang miring?",
        answer: 50,
        explanation: "The correct answer is 50 N. The gravitational force along the incline is mg sin(θ). For a 10 kg object on a 30° incline, the force is 10 * 10 * sin(30°) = 50 N."
    }
];

// Keep track of the current question index and the current question number
let currentQuestionIndex = 0;
let questionNumber = 1; // Start with Question 1
let questionSubmitted = false;

// Function to load the current question
function loadQuestion() {
    let questionBox = document.querySelector(".question-desc");
    let answerInput = document.getElementById("answer");
    let questionHeader = document.querySelector(".question"); // Select the question header

    // Load the current question
    questionBox.textContent = questionLibrary[currentQuestionIndex].question;

    // Update the question header to reflect the current question number
    questionHeader.textContent = "Question " + questionNumber; // Update question number

    // Clear previous answer input
    answerInput.value = "";

    // Hide the explanation box
    let explanationBox = document.getElementById("answer-explanation");
    explanationBox.style.display = "none";
    explanationBox.innerHTML = "";
}

// Load the first question when the page loads
loadQuestion();

document.getElementById("submit-btn").addEventListener("click", function() {
    let submitBtn = document.getElementById("submit-btn");
    let answer = parseInt(document.getElementById("answer").value, 10);
    let currentHealth = parseInt(document.querySelector(".number").textContent.split("/")[0], 10);
    let currentCoins = parseInt(document.querySelector(".status-item img[alt='Coins']").nextElementSibling.textContent, 10);

    let explanationBox = document.getElementById("answer-explanation"); // Explanation box
    // If we are in "Submit Answer" mode
    if (submitBtn.textContent === "Submit Answer" && !questionSubmitted) {
        questionSubmitted = true;
        if (!isNaN(answer)) {  // Ensure an answer is provided
            explanationBox.style.display = "flex"; 
            submitBtn.textContent = "Next Question"; // Change button text to "Next Question"
            if (answer === questionLibrary[currentQuestionIndex].answer) {
                // Correct answer
                alert("Correct! You earned 4 coins.");
                updateStatusItem("Coins", 4); // Increase coins by 4
                explanationBox.innerHTML = `<p>Great job! ${questionLibrary[currentQuestionIndex].explanation}</p>`;
            } else {
                // Wrong answer
                alert("Wrong answer. You lost 5 coins and 2 health.");
                updateStatusItem("Coins", -5); // Decrease coins by 5
                let newHealth = currentHealth - 2; // Decrease health by 2
                updateHealthBar(newHealth); // Update health bar
                updateStatusItem("Health", -2); // Decrease health status item by 2
                updateStatusItem("Apple", -2); // Decrease apple status item by 2
                updateStatusItem("Laughter", -2); // Decrease laughter status item by 2
                explanationBox.innerHTML = `<p>The correct answer was ${questionLibrary[currentQuestionIndex].answer}. ${questionLibrary[currentQuestionIndex].explanation}</p>`;
            }

            // Show the explanation box after updating it
            
        } else {
            alert("Please enter an answer.");
        }
    } 
    else if (submitBtn.textContent === "Next Question") {
        questionSubmitted = false;

        // Move to the next question and increment question number
        currentQuestionIndex++;
        questionNumber++; // Increment question number

        // Check if we have reached the end of the question library
        if (currentQuestionIndex >= questionLibrary.length) {
            currentQuestionIndex = 0; // Reset to the first question if at the end
            questionNumber = 1; // Reset the question number
            alert("Congratulations! You have completed all questions!");

            // Show confetti to celebrate winning the game
            showConfetti();

            // Optionally reset or reload the game after a delay
            setTimeout(function() {
                location.reload(); // Reload the game to start again
            }, 5000); // Display confetti for 5 seconds
        } else {
            // Load the next question
            loadQuestion();

            // Hide the explanation box for the next question
            explanationBox.style.display = "none"; 
            submitBtn.textContent = "Submit Answer";
        }
    }
});


