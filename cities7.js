
function generateGray(n) {

  if (n <= 0) {
    let temp = ["0"];
    return temp;
  }

  if (n == 1) {
    let temp = ["0", "1"];
    return temp;
  }

  let recAns = generateGray(n - 1);
  let mainAns = [];

  for (let i = 0; i < recAns.length; i++) {
    let s = recAns[i];
    mainAns.push("0" + s);
  }

  for (let i = recAns.length - 1; i >= 0; i--) {
    let s = recAns[i];
    mainAns.push("1" + s);
  }

  return mainAns;
}

function chooseOptimalDistance(t, k, ls) {

  let res = 0;

  const arrLength = ls.length;

  if (!ls.length || ls.length < k || k === 0 || t === 0) {
    return null;
  }

  const resArr = [];

  const corteges = generateGray(arrLength).filter(el => {
    const data = el.split('').reduce((acc, value) => {
      return acc += parseInt(value);
    }, 0);
    return data === k;
  });
  
  corteges.forEach(el => {
    const subArr = [];
    for (let i = 0; i < arrLength; i++) {
      if (el[i] == '1') subArr.push(ls[i]);
    }
    resArr.push(subArr);
  });

  res = resArr.reduce((acc, el, i) => {

    const elSum = el.reduce((sum, val) => {
      return sum + val;
    });

    el.forEach(val => {
      if (val === t) {
        res = val;
        return res;
      };
    });

    const p = Math.abs(elSum - t) <= Math.abs(acc - t) ? elSum : acc;

    if (t < p) return null;

    return p;
  }, 0);

  return res;
}

chooseOptimalDistance(t, k, ls);
