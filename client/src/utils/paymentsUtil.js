function minCashFlowRec(amount, answer) {
  // Find the indexes of minimum and
  // maximum values in amount
  // amount[mxCredit] indicates the maximum amount
  // to be given (or credited) to any person .
  // And amount[mxDebit] indicates the maximum amount
  // to be taken(or debited) from any person.
  // So if there is a positive value in amount,
  // then there must be a negative value
  const mxCredit = Object.entries(amount).reduce((prev, curr) =>
    curr[1] > prev[1] ? curr : prev
  )[0];

  // Find the person with the maximum negative net balance (debtor)
  const mxDebit = Object.entries(amount).reduce((prev, curr) =>
    curr[1] < prev[1] ? curr : prev
  )[0];
  // var mxCredit = getMax(amount),
  //   mxDebit = getMin(amount);

  // If both amounts are 0, then
  // all amounts are settled
  if (amount[mxCredit] <= 0 && amount[mxDebit] <= 0) return;

  // Find the minimum of two amounts
  var min = Math.min(Math.abs(-amount[mxDebit]), Math.abs(amount[mxCredit]));
  amount[mxCredit] -= min;
  amount[mxDebit] += min;

  answer.push({ from: mxDebit, to: mxCredit, amount: min });
  // Recur for the amount array.
  // Note that it is guaranteed that
  // the recursion would terminate
  // as either amount[mxCredit]  or
  // amount[mxDebit] becomes 0
  minCashFlowRec(amount, answer);
}

const minimizePayments = (balances) => {
  const netBalances = {};
  if (!balances || !balances.length) return balances;
  // Calculate net balances for each person (no changes needed)
  for (const balance of balances) {
    netBalances[balance.from] =
      (netBalances[balance.from] || 0) - balance.amount;
    netBalances[balance.to] = (netBalances[balance.to] || 0) + balance.amount;
  }

  // Find the person with the maximum positive net balance (creditor)
  const maxCreditor = Object.entries(netBalances).reduce((prev, curr) =>
    curr[1] > prev[1] ? curr : prev
  )[0];

  // Find the person with the maximum negative net balance (debtor)
  const maxDebtor = Object.entries(netBalances).reduce((prev, curr) =>
    curr[1] < prev[1] ? curr : prev
  )[0];
  var answer = [];
  minCashFlowRec(netBalances, answer);
  console.log({ answer });
  return answer;
};

module.exports = { minimizePayments };
