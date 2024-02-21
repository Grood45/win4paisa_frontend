function countdownForTransaction(minutes) {
  let seconds = minutes * 60;

  const countdownInterval = setInterval(function () {
    const minutesRemaining = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
   
    seconds--;

    if (seconds < 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}

module.exports = { countdownForTransaction };
