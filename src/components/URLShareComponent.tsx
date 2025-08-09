import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
  Paper,
} from "@mui/material";
import { ContentCopy, Share } from "@mui/icons-material";

export function URLShareComponent() {
  const [copySuccess, setCopySuccess] = useState(false);
  const [copyError, setCopyError] = useState(false);
  
  const currentURL = window.location.href;

  const handleCopyURL = async () => {
    try {
      // Try to use the modern Clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(currentURL);
        setCopySuccess(true);
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = currentURL;
        textArea.style.position = 'absolute';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopySuccess(true);
      }
    } catch (error) {
      console.error('Failed to copy URL:', error);
      setCopyError(true);
    }
  };

  const handleCloseSnackbar = () => {
    setCopySuccess(false);
    setCopyError(false);
  };

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        mb: 3,
        backgroundColor: "#f8f9fa",
        border: "1px solid #e9ecef",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Share sx={{ mr: 1, color: "#1976d2" }} />
        <Typography variant="h6" component="h2" color="primary">
          Share Voting Session
        </Typography>
      </Box>
      
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 2 }}
      >
        Send the URL to your colleagues to participate in the voting
      </Typography>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          value={currentURL}
          InputProps={{
            readOnly: true,
            style: { fontSize: "0.9rem" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              backgroundColor: "white",
            },
          }}
        />
        <Button
          variant="contained"
          startIcon={<ContentCopy />}
          onClick={handleCopyURL}
          sx={{
            minWidth: "100px",
            bgcolor: "#1976d2",
            "&:hover": { bgcolor: "#1565c0" },
          }}
        >
          Copy
        </Button>
      </Box>

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          URL copied to clipboard!
        </Alert>
      </Snackbar>

      <Snackbar
        open={copyError}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" variant="filled">
          Failed to copy URL. Please copy it manually.
        </Alert>
      </Snackbar>
    </Paper>
  );
}