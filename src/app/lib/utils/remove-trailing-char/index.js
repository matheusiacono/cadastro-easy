const removeTrailingChar = (val, char) => (val.slice(-1) === char ? val.slice(0, -1) : val);

export default removeTrailingChar;
