  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    showAddToHomeScreenButton();
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
