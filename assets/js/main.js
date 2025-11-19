// Typing animation
const text = "Java Developer | Python Developer | Video Editor";
let i = 0;
function typingAnimation() {
  document.querySelector(".typed-text").textContent = text.slice(0, i++);
  if (i <= text.length) setTimeout(typingAnimation, 80);
}
typingAnimation();

// AJAX Contact Form
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent page reload

  const form = e.target;
  const formData = new FormData(form);
  const formMessage = document.getElementById("formMessage");

  fetch("sendMail.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        formMessage.style.color = "green";
        formMessage.textContent = data.message;
        form.reset();
      } else {
        formMessage.style.color = "red";
        formMessage.textContent = data.message;
      }
    })
    .catch((err) => {
      formMessage.style.color = "red";
      formMessage.textContent = "Error sending message.";
      console.error(err);
    });
});
