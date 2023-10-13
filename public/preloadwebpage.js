
$(document).ready(async () => {
  var isUp = await isServiceUp();
  console.log(`Response: ${isUp}`);
  if (isUp) {
    $("#loader").fadeOut(1000);
    $("#content").fadeIn(1000);
  } else {
    $("#loader").show();
  }
});

// Function to check if the service is up using async/await
async function isServiceUp() {
  try {
    const response = await fetch("https://cookyourkitchen.onrender.com");
    console.log(`Response: ${response}`);
    if (response.ok) {
      return true; // Service is up
    } else {
      return false; // Service is down
    }

  } catch (error) {
    console.error('Error checking service status:', error);
    return false; // Service is down (due to error)
  }
}