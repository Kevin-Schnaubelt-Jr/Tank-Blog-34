document.addEventListener("DOMContentLoaded", () => {
  const jokeBtn = document.getElementById("joke-btn");
  const jokeBox = document.getElementById("joke-box");

  jokeBtn.addEventListener("click", async () => {
    jokeBtn.disabled = true;

    try {
      const response = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" }
      });
      const data = await response.json();
      jokeBox.textContent = data.joke;
    } catch (error) {
      jokeBox.textContent = "Couldn't fetch a joke. Try again!";
    }

    setTimeout(() => (jokeBtn.disabled = false), 3000);
  });
});
