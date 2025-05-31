export const getInitials = (name: string): string => {
  const nameArray = name.split(" ");

  if (nameArray.length === 1) return nameArray[0][0];
  else return nameArray[0][0] + nameArray[1][0];
};
