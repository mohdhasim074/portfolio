// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const menu = document.getElementById("menu");
menuBtn.addEventListener("click", () => menu.classList.toggle("hidden"));

// Initialize AOS
AOS.init({ duration: 1000, once: true });

// Initialize EmailJS
// emailjs.init("YOUR_PUBLIC_KEY");
emailjs.init("rAn3imGIwN3sZeXmw");

// Contact form & toast
const contactForm = document.getElementById("contact-form");
const toast = document.getElementById("toast");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const submitBtn = this.querySelector("button");
  const name = this.name.value.trim();
  const email = this.email.value.trim();
  const message = this.message.value.trim();

  if (!name || !email || !message) {
    showToast("Please fill all fields!", "error");
    return;
  }

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  try {
    // await emailjs.sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", this);
    await emailjs.sendForm("service_qssm5uf", "template_iukgc9e", this);
    showToast("Message sent successfully!", "success");
    this.reset();
  } catch (error) {
    console.error("EmailJS error:", error);
    showToast("Failed to send message.", "error");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Send Message";
  }
});

// Toast function
function showToast(message, type = "success") {
  toast.textContent = message;
  toast.className =
    "fixed bottom-5 right-5 p-4 rounded shadow-lg transition-all duration-300 opacity-0";

  // Success = green, Error = red
  if (type === "success") {
    toast.classList.add("bg-green-500", "text-white");
  } else {
    toast.classList.add("bg-red-500", "text-white");
  }

  toast.classList.add("opacity-100", "translate-y-0");

  // Slide in animation
  toast.style.transform = "translateY(0)";
  toast.style.opacity = "1";

  setTimeout(() => {
    toast.style.transform = "translateY(20px)";
    toast.style.opacity = "0";
  }, 3000);
}
// Toast function with Tailwind classes
function showToast(message, type = "success") {
  toast.textContent = message;

  // Reset classes
  toast.className =
    "fixed bottom-5 right-5 p-4 rounded shadow-lg opacity-0 translate-y-5 transition-all duration-300 pointer-events-none";

  // Tailwind colors for success/error
  if (type === "success") {
    toast.classList.add("bg-green-500", "text-white");
  } else {
    toast.classList.add("bg-red-500", "text-white");
  }

  // Slide in
  requestAnimationFrame(() => {
    toast.classList.remove("opacity-0", "translate-y-5");
    toast.classList.add("opacity-100", "translate-y-0");
  });

  // Hide after 3s
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-5");
    toast.classList.remove("opacity-100", "translate-y-0");
  }, 3000);
}
