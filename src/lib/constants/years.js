const getYears = () => {
  const currentYear = new Date().getFullYear();
  let yearsList = [""];
  for (let index = currentYear; index >= 1950; index--) {
    yearsList.push(index);
  }
  return yearsList;
};

const year = getYears();
export default year;
