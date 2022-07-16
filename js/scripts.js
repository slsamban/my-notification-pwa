
// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(
      '/service-worker.js',
      { scope: '/' }
    )
    .then(function (registration) {
      //console.log('Service Worker registered successfully:', registration);
    })
    .catch(function (error) {
      //console.log('Service Worker failed to register:', error);
    });
}
else {
  //console.log('Service Worker is not supported by this browser.');
}

const showNotificationButton = document.getElementById('show-notification-button');
const sendNotificationButton = document.getElementById('send-notification-button');
//const notificationForm = document.getElementById('notification-form');
const notificationTitle = document.getElementById('notification-title');
const notificationBody = document.getElementById('notification-body');

const permission = Notification.permission;
console.log('Permission:', permission);

switch (permission) {
  case 'granted':
    //sendNotificationButton.hidden = true
    console.log('Granted!')
    showNotification();
    break;

  case 'denied':
    //showNotificationButton.hidden = true
   // notificationBody .hidden = true
    //notificationTitle.hidden = true
    console.log('Denied!')
    break;

  case 'default':
    //notificationForm.disabled = true
    //showNotificationButton.hidden = true
    //notificationBody .hidden = true
    //notificationTitle.hidden = true
    console.log('Default!')
    requestUserPermission();
    break;
}

function showNotification() {
  console.log('In show Notifications!')
  const options = {
    body: 'Thank you',
    actions: [
      {
        action: 'agree',
        title: 'Agree'
      },
      {
        action: 'disagree',
        title: 'Disagree'
      }
    ]
  };

  //new Notification('Tilte',options);
  navigator.serviceWorker.ready.then((registration) => {
    registration.showNotification("Title goes here", options);
  });
}

function requestUserPermission() {
  Notification.requestPermission()
  .then((permission) => {
    if(permission === 'granted') {
      showNotification();
    }
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}