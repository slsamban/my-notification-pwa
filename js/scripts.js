
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
    //sendNotificationButton.hidden = true
    console.log('Granted!')
    showMyNotification();
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

function showMyNotification() {
  console.log('In show Notifications!')

  const title = document.getElementById('notification-title').value;
  const body = document.getElementById('notification-body').value;

  if(title==='') {
    alert('Title should be entered!');
  } else {

  const options = {
    body: body,
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
    registration.showNotification(title, options);
  });
}
}

function requestUserPermission() {
  Notification.requestPermission()
  .then((permission) => {
    if(permission === 'granted') {
      //showMyNotification();
    }
  })
  .catch((error) => {
    console.log('Error:', error);
  });
}

showNotificationButton.addEventListener('click', showMyNotification);
sendNotificationButton.addEventListener('click', requestUserPermission);