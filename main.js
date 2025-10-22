// Header Scroll
let nav=document.querySelector(".navbar");
window.onscroll=function(){
    if(document.documentElement.scrollTop>50){
        nav.classList.add("header-scrolled");
    }else{
        nav.classList.remove("header-scrolled"); 
    }
}
let navBar=document.querySelectorAll(".nav-link");
let navCollpase=document.querySelector(".navbar-collapse.collapse");
navBar.forEach(function(e){
    e.addEventListener("click",function(){
        navCollpase.classList.remove("show");
    })
})
// Chatbot functionality
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", async () => {
  const message = userInput.value.trim();
  if (!message) return;

  // user message
  const userMsg = document.createElement("div");
  userMsg.style.color = "blue";
  userMsg.textContent = message;
  chatBox.appendChild(userMsg);

  userInput.value = "";

  // typing indicator
  const typing = document.createElement("div");
  typing.style.color = "gray";
  typing.textContent = "Typing...";
  chatBox.appendChild(typing);

  try {
    const res = await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    chatBox.removeChild(typing);

    const botMsg = document.createElement("div");
    botMsg.style.color = "green";
    botMsg.textContent =
      data.choices?.[0]?.message?.content || "No response.";
    chatBox.appendChild(botMsg);
  } catch (err) {
    chatBox.removeChild(typing);
    const errorMsg = document.createElement("div");
    errorMsg.style.color = "red";
    errorMsg.textContent = "Error connecting to chatbot server.";
    chatBox.appendChild(errorMsg);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
});

// Send message with Enter key
userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    sendBtn.click();
  }
});
