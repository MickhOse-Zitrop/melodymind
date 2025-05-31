export const getBigNumber = (number: number) => {
  if (number > 999999)
    return `${parseFloat((number / 1000000).toFixed(6).slice(0, -5))}M`;
  else if (number > 999)
    return `${parseFloat((number / 1000).toFixed(3).slice(0, -2))}K`;
  else return number;
};
