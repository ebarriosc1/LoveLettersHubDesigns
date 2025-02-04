document.getElementById("loveLetterForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    let letterContent = document.getElementById("loveLetter").value;

    let response = await fetch("https://script.google.com/macros/s/AKfycbzUVtG0lId6ZbuCxGDdRJdz0iHQsGsWgyjuQkbF_QoiffTMtzdNiCSJB9xAinqOHXhlQA/exec", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ letter: letterContent }) // Ensuring it's sent as JSON
    });

    let textResponse = await response.text(); // Get response text for debugging
    console.log("Server Response:", textResponse); // Log response

    if (response.ok) {
        document.getElementById("submissionStatus").textContent = "💖 Your love letter has been saved!";
        document.getElementById("loveLetter").value = ""; // Clear input
    } else {
        document.getElementById("submissionStatus").textContent = "❌ Something went wrong. Try again!";
    }
});