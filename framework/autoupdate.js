const {app, autoUpdater, dialog} = require('electron');
var autoupdate = function(){
    const server = 'http://172.16.193.195:1337'
    const feed = `${server}/update/${process.platform}/${app.getVersion()}`;
    console.log(feed);
    autoUpdater.setFeedURL(feed)
    autoUpdater.checkForUpdates()
    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
      const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.'
      }
      dialog.showMessageBox(dialogOpts, (response) => {
        if (response === 0) autoUpdater.quitAndInstall()
      })
    })
    autoUpdater.on('error', message => {
      console.error('There was a problem updating the application')
      console.error(message)
    })
}

export default autoupdate;
  