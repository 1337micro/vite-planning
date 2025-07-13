import type { Socket } from "socket.io-client";
import { useParams } from "react-router";
import { Container, Box } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import { useJoinRoom } from "./hooks/eventHandlers/useJoinRoom.ts";
import { JoinModal } from "./components/JoinModal.tsx";
import { Header } from "./components/Header.tsx";
import { StoryCard } from "./components/StoryCard.tsx";
import { Timer } from "./components/Timer.tsx";
import { ResultsPanel } from "./components/ResultsPanel.tsx";
import { Table } from "./components/Table.tsx";
import { VotingBallots } from "./components/VotingBallots.tsx";
import _ from "lodash";

interface IGameProps {
  socket: Socket;
}
export function Game(props: IGameProps) {
  const { socket } = props;
  const { roomId } = useParams();

  const { room, joinRoom } = useJoinRoom(socket, roomId);

  // Mock votes for demo purposes
  const mockVotes = room?.users.map(user => ({
    userId: user.id,
    userName: user.name,
    vote: user.vote?.vote || ""
  })).filter(v => v.vote) || [];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      <Header roomId={roomId} participantCount={room?.users.length} />
      
      <Container maxWidth="lg">
        <JoinModal onJoin={joinRoom} />
        
        {_.isNil(room) ? (
          <Skeleton />
        ) : (
          <Box>
            <StoryCard 
              title="User Authentication Feature"
              description="As a user, I want to be able to log in securely so that I can access my personal dashboard and settings."
              priority="High"
            />
            
            <Timer 
              duration={180} 
              onTimeUp={() => console.log("Time's up!")}
            />
            
            <ResultsPanel
              votes={mockVotes}
              isRevealed={false}
              onReveal={() => console.log("Reveal votes")}
              onNewVoting={() => console.log("Start new voting")}
            />
            
            <Table room={room} socket={socket} />
            
            <Box sx={{ mt: 4 }}>
              <VotingBallots
                socket={socket}
                votes={["1", "2", "3", "5", "8", "13", "21", "?", "☕"]}
                roomId={roomId || ""}
              />
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
