
// Function to check if the service is up using async/await
async function isServiceUp() {
    try {
      const response = await fetch("https://cookyourkitchen.onrender.com"); 
      console.log(response);

    } catch (error) {
      console.error('Error checking service status:', error);
      return false; // Service is down or unreachable
    }
  }

$(document).ready( () => {
    if(isServiceUp()){
        $("#loader").fadeOut(1000);
        $("#content").fadeIn(1000);
    } else {
        $("#loader").show();
    }
    
});