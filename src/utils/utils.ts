import _ from "lodash";

export const parseVotingBallotOptions = (votesString: string): string[] => {
  const sortedVotes = votesString
    .split(",")
    .map((vote) => vote.trim())
    .sort((voteA, voteB) => parseFloat(voteA) - parseFloat(voteB))
    .filter((vote) => vote.length > 0);

  return _.uniq(sortedVotes);
};
