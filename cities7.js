// const ls = [51, 52, 58, 59, 61, 85, 92, 98];
// const t = 545;
// const k = 7;

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

  res = resArr.reduce((acc, el) => {
    
    const elSum = el.reduce((sum, val) => {
      return sum + val;
    });

    el.forEach(val => {
      if (val === t) {
        res = val;
        return res;
      };
    });

    if (arrLength === 0 || ls.length < k || t < elSum) {
      return null;
    }

    return (Math.abs(elSum - t) <= Math.abs(acc - t) ? elSum : acc);
  }, 0);

  return res;
}

chooseOptimalDistance(t, k, ls);
