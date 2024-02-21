export const calculatePL = (bet, runner1, runner2) => {
  let l2 = 0;
  let l1 = 0;
  if (!bet) {
    return [l1, l2];
  }
  for (let h = 0; h < bet.length; h++) {
    if (
      bet[h].runner_name === runner1 &&
      bet[h].bet_type === "back" &&
      (bet[h].bet_category == "odds" || bet[h].bet_category == "bookmaker")
    ) {
      l2 -= Number(bet[h].stake);
      l1 += Number(bet[h].stake) * Number(bet[h].rate) - Number(bet[h].stake);
    }
    if (
      bet[h].runner_name === runner1 &&
      bet[h].bet_type === "lay" &&
      (bet[h].bet_category == "odds" || bet[h].bet_category == "bookmaker")
    ) {
      l1 -= Math.floor(
        Number(bet[h].stake) * Number(bet[h].rate) - Number(bet[h].stake)
      );
      l2 += Number(bet[h].stake);
    }
    if (
      bet[h].runner_name === runner2 &&
      bet[h].bet_type === "back" &&
      (bet[h].bet_category == "odds" || bet[h].bet_category == "bookmaker")
    ) {
      l2 += Math.floor(Number(bet[h].stake) * Number(bet[h].rate));
      l2 -= Number(bet[h].stake);
      l1 -= Number(bet[h].stake);
    }
    if (
      bet[h].runner_name === runner2 &&
      bet[h].bet_type === "lay" &&
      (bet[h].bet_category == "odds" || bet[h].bet_category == "bookmaker")
    ) {
      l2 -=Math.floor(Number(bet[h].stake) * Number(bet[h].rate)) -Number(bet[h].stake);
      l1 += Number(bet[h].stake);
      
    }
  }

   
  return [Math.round(l1), Math.round(l2)];
};
