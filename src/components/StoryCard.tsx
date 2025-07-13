import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Assignment } from "@mui/icons-material";

interface StoryCardProps {
  title?: string;
  description?: string;
  storyPoints?: string;
  priority?: "Low" | "Medium" | "High";
}

export function StoryCard({ 
  title = "User Story Title",
  description = "As a user, I want to see a clear story description so that I can understand what we're estimating.",
  storyPoints,
  priority = "Medium"
}: StoryCardProps) {
  const priorityColors = {
    Low: "#4caf50",
    Medium: "#ff9800", 
    High: "#f44336"
  };

  return (
    <Card 
      sx={{ 
        mb: 3, 
        border: "2px solid #e3f2fd",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        borderRadius: 3
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Assignment sx={{ mr: 1, color: "#1976d2" }} />
          <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Chip 
            label={priority}
            size="small"
            sx={{ 
              bgcolor: priorityColors[priority],
              color: "white",
              fontWeight: "bold"
            }}
          />
        </Box>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
        
        {storyPoints && (
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
            <Typography variant="caption" sx={{ mr: 1 }}>
              Current Estimate:
            </Typography>
            <Chip 
              label={`${storyPoints} points`}
              variant="outlined"
              color="primary"
            />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}