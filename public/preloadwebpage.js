
// Function to check if the service is up using async/await
async function isServiceUp() {
  try {
    const response = await fetch("/");
    console.log(`Response: ${response.ok}`);
    return true; //service is up
    // if (response.ok) {
    //   return true; // Service is up
    // } else {
    //   return false; // Service is down
    // }

  } catch (error) {
    console.error('Error checking service status:', error);
    return false; // Service is down (due to error)
  }
}


$(document).ready(async () => {
  var isUp = await isServiceUp();
  console.log(`Service: ${isUp}`);

  // //periodic check for service status. checks every 2 seconds
  // setInterval( () => {
  //   if(isUp){
  //     $("#loader").fadeOut(1000);
  //     $("#content").fadeIn(1000);
  //   } else {
  //     $("#loader").show();
  //   }
  // }, 1000); 

  if (isUp) {
    $("#loader").hide();
  } else {
    $("#loader").show();
  }
});

