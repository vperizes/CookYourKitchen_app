// Function to check if the service is up using async/await
async function isServiceUp() {
  try {
    const response = await fetch("/");
    console.log(`Response: ${response.ok}`);
    return true; //service is up
  } catch (error) {
    console.error("Error checking service status:", error);
    return false; // Service is down (due to error)
  }
}

$(document).ready(async () => {
  var isUp = await isServiceUp();
  console.log(`Service: ${isUp}`);

  if (isUp) {
    $("#loader").fadeOut(1000);
    $("#content").fadeIn(1000);
  } else {
    $("#loader").show();
  }
});
