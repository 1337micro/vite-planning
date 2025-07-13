import { AppBar, Toolbar, Typography, Box, Chip } from "@mui/material";
import { Groups, Casino } from "@mui/icons-material";

interface HeaderProps {
  roomId?: string;
  participantCount?: number;
}

export function Header({ roomId, participantCount = 0 }: HeaderProps) {
  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2", mb: 3 }}>
      <Toolbar>
        <Casino sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Planning Poker
        </Typography>
        
        {roomId && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Chip
              icon={<Groups />}
              label={`${participantCount} participant${participantCount !== 1 ? 's' : ''}`}
              variant="outlined"
              sx={{ color: "white", borderColor: "white" }}
            />
            <Chip
              label={`Room: ${roomId.startsWith('demo-') ? 'Demo' : roomId}`}
              variant="outlined"
              sx={{ color: "white", borderColor: "white" }}
            />
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}