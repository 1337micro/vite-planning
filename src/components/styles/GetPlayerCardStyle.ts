const commonCardStyles = {
  border: "1px solid blue",
  outline: "blue",
  fontSize: "18px",
  borderRadius: 2,
  height: 80,
  width: 30,
};
export function getPlayerCardStyle(isSelected?: boolean) {
  return {
    ...commonCardStyles,
    bgcolor: isSelected ? "#3993ff" : "#e8e9ea",
    color: isSelected ? "white" : undefined,
  };
}

export function getVotingBallotCardStyle(isSelected?: boolean) {
  return {
    ...commonCardStyles,
    bgcolor: isSelected ? "#3993ff" : undefined,
    color: isSelected ? "white" : undefined,
  };
}
