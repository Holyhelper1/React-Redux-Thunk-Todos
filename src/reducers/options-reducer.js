const optionInitialState = {
	searchInput: '',
	searchPhrase: '',
	isAlphabetSorting: false,
	isLoading: true,
};

export const optionsReducer = (
  state = optionInitialState,
  { type, payload }
) => {
  switch (type) {
    default:
      return state;
  }
};
