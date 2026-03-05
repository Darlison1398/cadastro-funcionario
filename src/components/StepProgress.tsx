import { Box, Typography, LinearProgress } from "@mui/material";

type StepProgressProps = {
  progress: number;
  title: string;
  subtitle: string;
};

export default function StepProgress({ progress, title, subtitle }: StepProgressProps) {
  return (
    <Box sx={{ mb: 3 }}>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <Typography variant="caption" color="text.secondary">
          {title}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>

      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          height: 8,
          borderRadius: 5,
          mt: 1,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: "#4fb66e",
          },
        }}
      />

      <Typography
        variant="caption"
        sx={{ display: "block", textAlign: "right", mt: 0.5 }}
      >
        {progress}%
      </Typography>
    </Box>
  );
}