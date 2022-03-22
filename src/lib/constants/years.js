const getYears = () => {
  const currentYear = new Date().getFullYear();
  let yearsList = [];
  for (let index = 0; index < 50; index++) {
    const year = currentYear - index;
    yearsList.push(year);
  }
  return yearsList;
};

const year = getYears();
export default year;
