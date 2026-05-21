const CLIENT_ID =
  '254273646286-g8oubc5esf8ujvfab5m1oaodeiop34kn.apps.googleusercontent.com';

function dismissOneTap() {
  if (window.google && google.accounts && google.accounts.id) {
    google.accounts.id.cancel();
  }

  document
    .querySelectorAll('div[id^="credential_picker_container"]')
    .forEach(el => el.remove());

  document.querySelectorAll('iframe').forEach(el => {
    if (el.src && el.src.includes('accounts.google.com')) {
      const p = el.parentElement;
      (p && p !== document.body ? p : el).remove();
    }
  });
}

function showProfile(name, email, picture) {
  dismissOneTap();

  document.getElementById('login-view').style.display = 'none';

  document
    .getElementById('profile-view')
    .classList.add('visible');

  document.getElementById('profile-name').textContent = name;
  document.getElementById('profile-email').textContent = email;

  const initials = name
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  document.getElementById('profile-initials').textContent = initials;

  if (picture) {
    const img = document.getElementById('profile-pic');

    img.src = picture;
    img.style.display = 'block';

    document.getElementById('profile-initials').style.display = 'none';
  }
}

function handleCredentialResponse(response) {
  const payload = JSON.parse(
    atob(response.credential.split('.')[1])
  );

  showProfile(payload.name, payload.email, payload.picture);
}

function signInWithGoogle() {
  google.accounts.id.initialize({
    client_id: CLIENT_ID,
    callback: handleCredentialResponse
  });

  google.accounts.id.prompt((n) => {
    if (n.isNotDisplayed() || n.isSkippedMoment()) {
      const tmp = document.createElement('div');
      ///////////////////////////////
      tmp.style.position = 'fixed';
      tmp.style.top = '-9999px';
      tmp.style.left = '-9999px';
      tmp.style.opacity = '0';
      tmp.style.pointerEvents = 'none';
      ////////////////////////////////////
      document.body.appendChild(tmp);

      google.accounts.id.renderButton(tmp, {
        type: 'standard',
        size: 'large'
      });

      tmp.querySelector('div[role=button]')?.click();
            // Clean up the hidden button after the flow completes or is cancelled
      setTimeout(() => tmp.remove(), 5000);
      /////////////////////
    }
    
  });
}

function demoEmailLogin() {
  const emailInput = document.getElementById('email');
  const passInput = document.getElementById('password');
  const errorMsg = document.getElementById('email-error');

  [emailInput, passInput].forEach(el => {
    el.classList.remove('shake', 'input-error');

    void el.offsetWidth;

    el.classList.add('shake', 'input-error');
  });

  errorMsg.classList.add('visible');

  [emailInput, passInput].forEach(el => {
    el.addEventListener('input', () => {
      el.classList.remove('input-error');
      errorMsg.classList.remove('visible');
    }, { once: true });
  });
}

function signOut() {
  if (window.google && google.accounts) {
    google.accounts.id.disableAutoSelect();
  }

  document
    .getElementById('profile-view')
    .classList.remove('visible');

  document.getElementById('login-view').style.display = 'block';

  document.getElementById('email').value = '';
  document.getElementById('password').value = '';

  document
    .getElementById('email-error')
    .classList.remove('visible');

  document
    .getElementById('email')
    .classList.remove('input-error');

  document
    .getElementById('password')
    .classList.remove('input-error');
}

window.addEventListener('load', () => {
  if (window.google) {
    google.accounts.id.initialize({
      client_id: CLIENT_ID,
      callback: handleCredentialResponse
    });
  }

});
