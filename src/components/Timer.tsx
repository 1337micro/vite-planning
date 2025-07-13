import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Button, Box, LinearProgress } from "@mui/material";
import { Timer as TimerIcon, PlayArrow, Pause, Stop } from "@mui/icons-material";

interface TimerProps {
  duration?: number; // in seconds
  onTimeUp?: () => void;
}

export function Timer({ duration = 300, onTimeUp }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => {
          if (time <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            onTimeUp?.();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(duration);
    setIsFinished(false);
  };

  return (
    <Card sx={{ mb: 2, bgcolor: isFinished ? "#ffebee" : "#f3e5f5" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <TimerIcon sx={{ mr: 1, color: isFinished ? "#d32f2f" : "#7b1fa2" }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Voting Timer
          </Typography>
          <Typography 
            variant="h4" 
            sx={{ 
              fontFamily: "monospace",
              color: isFinished ? "#d32f2f" : timeLeft < 30 ? "#ff5722" : "#424242"
            }}
          >
            {formatTime(timeLeft)}
          </Typography>
        </Box>

        <LinearProgress 
          variant="determinate" 
          value={progress} 
          sx={{ 
            mb: 2, 
            height: 8, 
            borderRadius: 4,
            bgcolor: "#e0e0e0",
            "& .MuiLinearProgress-bar": {
              bgcolor: isFinished ? "#d32f2f" : timeLeft < 30 ? "#ff5722" : "#7b1fa2"
            }
          }} 
        />

        <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
          {!isRunning ? (
            <Button 
              variant="contained" 
              startIcon={<PlayArrow />}
              onClick={handleStart}
              disabled={isFinished && timeLeft === 0}
              sx={{ bgcolor: "#4caf50" }}
            >
              Start
            </Button>
          ) : (
            <Button 
              variant="contained" 
              startIcon={<Pause />}
              onClick={handlePause}
              sx={{ bgcolor: "#ff9800" }}
            >
              Pause
            </Button>
          )}
          
          <Button 
            variant="outlined" 
            startIcon={<Stop />}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Box>

        {isFinished && (
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ mt: 2, color: "#d32f2f", fontWeight: "bold" }}
          >
            ⏰ Time's up! Please finish your voting.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}