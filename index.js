let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
  // Check if the app is already installed
  if (!isAppInstalled()) {
    showAddToHomeScreenButton();
  }
});

function showAddToHomeScreenButton() {
  const addToHomeButton = document.querySelector('.add-to-home-button');
  addToHomeButton.style.display = 'block';
  addToHomeButton.addEventListener('click', addToHomeScreen);
}

function addToHomeScreen() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt = null;
    });
  }
}

function isAppInstalled() {
  // Check if the current device supports the beforeinstallprompt event
  if (!window.matchMedia('(display-mode: standalone)').matches && !window.navigator.standalone) {
    return false;
  }
  return true;
}
