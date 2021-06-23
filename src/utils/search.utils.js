export const readSearch = (location, initialSearch) => {
  const stateData = { ...initialSearch };
  if (location.search) {
    const searchQuery = location.search.substring(1);
    const queries = searchQuery.split("&");
    queries.forEach((query) => {
      const variables = query.split("=");
      stateData[variables[0]] = variables[1];
    });
  }
  return stateData;
};
