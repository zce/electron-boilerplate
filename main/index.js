// Packages
const { app, BrowserWindow } = require('electron')
const { setWindowURL } = require('neutron')

// Create a new example window once the application
// is ready to show something to the user.
app.on('ready', async () => {
  const introWindow = new BrowserWindow({
    width: 800,
    height: 600
  })

  // This method takes in a `BrowserWindow` instance
  // as the first argument and the name of the
  // renderer page (located in the "pages" directory) you
  // would like to load as the second one.
  setWindowURL(introWindow, 'index')
})

// Quit the app once all windows are closed
app.on('window-all-closed', app.quit)
