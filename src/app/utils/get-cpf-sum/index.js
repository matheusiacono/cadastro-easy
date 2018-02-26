const getCpfSum = (ref, numbers) => numbers.reduce((ac, cur, i) => ac + (cur * (ref - i)), 0);

export default getCpfSum;
