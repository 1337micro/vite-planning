import { Card, CardContent, Typography, Box, Chip, Divider, Button } from "@mui/material";
import { BarChart, Visibility, FileDownload } from "@mui/icons-material";

interface Vote {
  userId: string;
  userName: string;
  vote: string;
}

interface ResultsPanelProps {
  votes: Vote[];
  isRevealed?: boolean;
  onReveal?: () => void;
  onNewVoting?: () => void;
}

export function ResultsPanel({ votes, isRevealed = false, onReveal, onNewVoting }: ResultsPanelProps) {
  const getVoteStats = () => {
    const voteCount: Record<string, number> = {};
    const numericVotes: number[] = [];
    
    votes.forEach(({ vote }) => {
      voteCount[vote] = (voteCount[vote] || 0) + 1;
      const numVote = parseFloat(vote);
      if (!isNaN(numVote)) {
        numericVotes.push(numVote);
      }
    });

    const sortedVotes = Object.entries(voteCount).sort(([a], [b]) => {
      const numA = parseFloat(a);
      const numB = parseFloat(b);
      if (isNaN(numA) && isNaN(numB)) return a.localeCompare(b);
      if (isNaN(numA)) return 1;
      if (isNaN(numB)) return -1;
      return numA - numB;
    });

    const average = numericVotes.length > 0 
      ? numericVotes.reduce((sum, vote) => sum + vote, 0) / numericVotes.length 
      : 0;

    const consensus = sortedVotes.length === 1 ? sortedVotes[0][0] : null;

    return { voteCount: sortedVotes, average, consensus };
  };

  const { voteCount, average, consensus } = getVoteStats();
  const totalVotes = votes.length;

  return (
    <Card sx={{ mb: 3, border: "2px solid #e3f2fd" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <BarChart sx={{ mr: 1, color: "#1976d2" }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Voting Results ({totalVotes} vote{totalVotes !== 1 ? 's' : ''})
          </Typography>
          
          {!isRevealed && votes.length > 0 && (
            <Button
              variant="contained"
              startIcon={<Visibility />}
              onClick={onReveal}
              sx={{ bgcolor: "#4caf50" }}
            >
              Reveal Votes
            </Button>
          )}
        </Box>

        {!isRevealed && votes.length > 0 && (
          <Typography variant="body2" color="text.secondary" align="center">
            Votes are hidden. Click "Reveal Votes" to see results.
          </Typography>
        )}

        {isRevealed && votes.length > 0 && (
          <>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Vote Distribution:
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                {voteCount.map(([vote, count]) => (
                  <Chip
                    key={vote}
                    label={`${vote}: ${count}`}
                    variant="outlined"
                    sx={{ 
                      bgcolor: "#f3e5f5",
                      borderColor: "#7b1fa2",
                      fontWeight: "bold"
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Statistics:
              </Typography>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                {average > 0 && (
                  <Chip
                    label={`Average: ${average.toFixed(1)}`}
                    color="primary"
                    variant="outlined"
                  />
                )}
                {consensus && (
                  <Chip
                    label={`Consensus: ${consensus}`}
                    color="success"
                    variant="filled"
                  />
                )}
                {!consensus && votes.length > 1 && (
                  <Chip
                    label="No Consensus"
                    color="warning"
                    variant="outlined"
                  />
                )}
              </Box>
            </Box>

            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Button
                variant="outlined"
                startIcon={<FileDownload />}
                size="small"
              >
                Export Results
              </Button>
              <Button
                variant="contained"
                onClick={onNewVoting}
                sx={{ bgcolor: "#1976d2" }}
              >
                Start New Voting
              </Button>
            </Box>
          </>
        )}

        {votes.length === 0 && (
          <Typography variant="body2" color="text.secondary" align="center">
            No votes yet. Participants can select their estimates below.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}