document.getElementById("recommend-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const response = await fetch("/recommend", {
    method: "POST",
    body: formData,
  });

  const list = document.getElementById("recommendationList");
  list.innerHTML = ""; // Clear previous recommendations

  if (response.ok) {
    const recommendations = await response.json();
    recommendations.forEach((recommendation) => {
      const li = document.createElement("li");
      li.textContent = recommendation;
      list.appendChild(li);
    });
  } else {
    const error = await response.json();
    const li = document.createElement("li");
    li.textContent = error.error || "An error occurred.";
    list.appendChild(li);
  }
});
