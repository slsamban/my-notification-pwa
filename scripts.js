
// Service Worker registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register(
      '/my-notification-pwa/service-worker.js',
      { scope: '/my-notification-pwa/' }
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
    showNotificationButton.hidden = false;
    sendNotificationButton.hidden = true;
    notificationTitle.disabled = false;
    notificationBody.disabled = false;
    console.log('Granted!')
    break;

  case 'denied':
    showNotificationButton.hidden = true;
    sendNotificationButton.hidden = false;
    notificationTitle.disabled = true;
    notificationBody.disabled = true;
    console.log('Denied!')
    break;

  case 'default':
    showNotificationButton.hidden = true;
    sendNotificationButton.hidden = false;
    notificationTitle.disabled = true;
    notificationBody.disabled = true;
    console.log('Default!')
    break;
}

function showMyNotification() {
  console.log('In show My Notifications!')

  const title = document.getElementById('notification-title').value;
  const body = document.getElementById('notification-body').value;

  if (title === '') {
    alert('Title should be entered!');
  } else {

    const options = {
      body: body,
      actions: [
        {
          action: 'confirm',
          title: 'Agree'
        },
        {
          action: 'cancel',
          title: 'Disagree'
        }
      ]
    };

    //new Notification('Tilte',options);
    navigator.serviceWorker.ready.then((registration) => {
      registration.showNotification(title, options);
    });
  }
}

function requestUserPermission() {
  console.log('Requesting Permissions!')
  Notification.requestPermission()
    .then((permission) => {
      if (permission === 'granted') {
        showNotificationButton.hidden = false;
        sendNotificationButton.hidden = true;
        notificationTitle.disabled = true;
        notificationBody.disabled = true;
      }
    })
    .catch((error) => {
      console.log('Error:', error);
    });
}

document.getElementById('show-notification-button').addEventListener('click', showMyNotification);
document.getElementById('send-notification-button').addEventListener('click', requestUserPermission);