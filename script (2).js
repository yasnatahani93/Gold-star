
// Gold Star: ضبط صدا و پاسخ صوتی به زبان فارسی
const button = document.getElementById("speakButton");
const statusText = document.getElementById("status");

button.addEventListener("click", () => {
  const recognition = new webkitSpeechRecognition() || new SpeechRecognition();
  recognition.lang = "fa-IR";
  recognition.start();
  statusText.innerText = "در حال گوش دادن...";

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    statusText.innerText = "در حال پاسخ‌دهی...";

    const reply = await getResponse(transcript);
    speak(reply);
  };

  recognition.onerror = () => {
    statusText.innerText = "مشکلی در دریافت صدا پیش آمد";
  };
});

async function getResponse(text) {
  // اینجا می‌تونی پاسخ ثابت یا متصل به هوش مصنوعی بذاری
  if (text.includes("سلام")) return "سلام! من گُلد استار هستم. چطور کمکت کنم؟";
  if (text.includes("خداحافظ")) return "خدانگهدار! هر وقت خواستی برگرد.";
  return "متأسفم، متوجه نشدم.";
}

function speak(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fa-IR";
  speechSynthesis.speak(utterance);
}
