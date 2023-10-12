
// Function to check if the service is up using async/await
async function isServiceUp() {
    try {
      const response = await fetch("/"); 
      console.log(response);

    } catch (error) {
      console.error('Error checking service status:', error);
    }
  }

$(document).ready(() => {
  var isUp = isServiceUp();
  console.log(isUp);
    if(isUp){
        $("#loader").fadeOut(1000);
        $("#content").fadeIn(1000);
    } else {
        $("#loader").show();
    }
});