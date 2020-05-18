
const config = require('./config/setup.js')
const checkModul = require('./index.js')

// Main Loop
Main()
setInterval(Main, config.minCheckInterval)

// Function Main
function Main() {

  // Init static lastCheck
  if( typeof Main.lastCheck == 'undefined' ) {
    Main.lastCheck = new Date()
    Main.lastCheck.setDate(Main.lastCheck.getDate() + 1)
    console.log(Main.lastCheck)
  }

  // Get now and nowHHMM
  var now = new Date()
  var nowHHMM = ("0" + now.getHours()).slice(-2) + ':' + ("0" + now.getMinutes()).slice(-2)

  // Reset Checks to not done
  if (Main.lastCheck > now) {
    console.log ('Init checks')
    config.checks.forEach(check => {
      check.done = false
    })
  }

  // Loop thru all checks 
  config.checks.forEach((check) => {
    if (nowHHMM > check.hhmm && check.done == false) {
      // Do the Check Action
      console.log('DO THE TIME CHECK FOR', check.hhmm)  
      checkModul
      check.done = true
    }
  })

  // Update lastCheck
  Main.lastCheck = now

}
