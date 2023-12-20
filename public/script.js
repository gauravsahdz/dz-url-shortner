const input_text = document.querySelector("#input_text");
const output_text = document.querySelector("#output_text");
const btn = document.querySelector("#btn");
const loader = document.querySelector(".loader");
const copyIcon = document.querySelector(".copy-icon");

btn.addEventListener("click", async () => {
  loader.style.display = "block";
  const inputUrl = input_text.value.trim();

  try {
    const response = await fetch("/shorten-url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: inputUrl }),
    });

    const result = await response.json();
    const shortenedUrl = result.shortenedUrl;

    output_text.innerHTML = shortenedUrl;
  } catch (error) {
    alert("Something went wrong");
  } finally {
    loader.style.display = "none";
  }
});

copyIcon.addEventListener("click", () => {
  const text = output_text.innerHTML;
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard");
});
