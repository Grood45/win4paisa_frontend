function formatTime(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function timeInSecond(openingDate) {
  const targetDate = new Date(openingDate).getTime();

  const timer = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeRemaining = targetDate - currentTime;

      if (timeRemaining <= 0) {
          clearInterval(timer);
      } else {
          const formattedTime = formatTime(timeRemaining);
      }
  }, 1000); // Update every second
}

export default timeInSecond;
