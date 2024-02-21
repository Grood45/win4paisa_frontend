export const tossCalculation = (bet=[], team1, team2) => {
  let l1 = 0;
  let l2 = 0;

  for (let i = 0; i < bet.length; i++) {
    if (bet[i].team == team1 && bet[i].bet_type == "back") {
      l1 += bat[i].stake;
    }
    if (bet[i].team == team1 && bet[i].bet_type == "lay") {
      l1 -= bat[i].stake;
    }
    if (bet[i].team == team2 && bet[i].bet_type == "back") {
      l2 += bat[i].stake;
    }
    if (bet[i].team == team2 && bet[i].bet_type == "lay") {
      l2 -= bat[i].stake;
    }
  }

  return [l1, l2]
};


