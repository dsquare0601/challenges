//SAMPLE INPUT
/**
STDIN                       Function
-----                       --------
9                           n = 9
10 20 20 10 10 30 50 10 20  ar = [10, 20, 20, 10, 10, 30, 50, 10, 20]
*/

//SAMPLE OUTPUT
// 3

function sockMerchant(n, ar) {
  // Write your code here
  let pairs = 0;
  const unique = [...new Set(ar)];
  console.log(unique);
  for (let i = 0; i < unique.length; i++) {
    let pair = Math.floor(ar.filter((ele) => ele === unique[i]).length / 2);
    if (pair > 0) pairs += pair;
  }
  return pairs;
}
