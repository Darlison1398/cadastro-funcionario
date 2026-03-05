import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

type StepIndicatorVerticalProps = {
  step: number;
};

export default function StepIndicatorVertical({ step }: StepIndicatorVerticalProps) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "6em", width: "240px" }}>
      
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {step > 1 ? (
          <CheckCircleIcon sx={{ color: "#4fb66e" }} />
        ) : (
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: "#4fb66e",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            1
          </Box>
        )}

        <Typography>Infos Básicas</Typography>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            backgroundColor: step === 2 ? "#4fb66e" : "#ccc",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12,
            fontWeight: "bold",
          }}
        >
          2
        </Box>

        <Typography>Infos Profissionais</Typography>
      </Box>

    </Box>
  );
}