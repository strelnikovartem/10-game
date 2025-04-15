const startBtn = document.querySelector(".start-btn");
const container = document.querySelector(".container");
const result = document.querySelector(".result");

startBtn.addEventListener("click", hendleStart);

function hendleStart() {
  startBtn.disabled = true;
  result.innerHTML = "";

  const promises = [...container.children].map(() => {
    return new Promise((resolve, reject) => {
      const random = Math.random();

      if (random > 0.5) {
        resolve("🤑");
      } else {
        reject("👿");
      }
    });
  });
  Promise.allSettled(promises).then((items) => {
    const isWinner =
      items.every((item) => item.status === "fulfilled") ||
      items.every((item) => item.status === "rejected");

    items.forEach((item, i) => {
      container.children[i].textContent = "";
      setTimeout(() => {
        container.children[i].textContent = item.value || item.reason;
        if (i === items.length - 1) {
          result.innerHTML = isWinner ? "Winner" : "Loser";
          startBtn.disabled = false;
        }
      }, 1000 * (i + 1));
    });
  });
}
