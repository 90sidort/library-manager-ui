const calculateFine = (borrowed) => {
  const borrowDate = new Date(borrowed);
  const returnDate = new Date();
  return (
    Math.floor(
      (returnDate.getTime() - borrowDate.getTime()) / (1000 * 3600 * 24)
    ) * 5
  );
};

export default calculateFine;
