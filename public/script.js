function showTab(tabId, el) {
    document.querySelectorAll('.form-section').forEach(section => {
      section.classList.remove('active');
    });
    document.querySelectorAll('.tab').forEach(tab => {
      tab.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');
    el.classList.add('active');
  }
  
  function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
  
    firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;

    // ✅ Set display name and avatar
    return user.updateProfile({
      displayName: "John Doe", // Replace with user's input name if available
      photoURL: "profile.png" // Use a valid image path or URL
    });
  })
  .then(() => {
    // ✅ Redirect after setting profile
    window.location.href = "index.html";
  })
  .catch((error) => {
    console.error("Error during registration:", error.message);
    alert(error.message);
  });

  }
  
  function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
  
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        alert("Login successful!");
        window.location.href = "index.html";
      })
      .catch(error => {
        alert("Login error: " + error.message);
      });
  }
  
  function resetPassword() {
    const email = document.getElementById('forgot-email').value;
  
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        alert("Password reset link sent!");
      })
      .catch(error => {
        alert("Reset error: " + error.message);
      });
  }
  