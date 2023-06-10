


// Get a reference to the audio element
const spinnerSound = document.getElementById("spinnerSound");

const clappingSound = document.getElementById("clappingSound");

// Get a reference to the button element
const spinButton = document.getElementById("chart");

// Add a click event listener to the button
spinButton.addEventListener("click", function () {
  // Play the spinner sound
  spinnerSound.play();

  // Add an event listener to detect when the audio playback is complete
  spinnerSound.addEventListener("ended", function () {
    // Add your code here to perform actions when the audio finishes playing
    console.log("Spinner sound completed");
    // Add the additional audio playback code here
    clappingSound.play();
  });
});
