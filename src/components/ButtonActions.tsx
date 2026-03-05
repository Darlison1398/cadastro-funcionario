import { Box, Button } from "@mui/material";

type ButtonActionsProps = {
  onBack: () => void;
  onNext?: () => void;
  nextLabel: string;
  isSubmit?: boolean;
};

export default function ButtonActions({
  onBack,
  onNext,
  nextLabel,
  isSubmit = false,
}: ButtonActionsProps) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      <Button
        variant="outlined"
        onClick={onBack}
        sx={{
          color: "grey.700",
          borderColor: "grey.400",
          "&:hover": {
            borderColor: "grey.600",
            backgroundColor: "grey.100",
          },
        }}
      >
        Voltar
      </Button>

      <Button
        variant="contained"
        onClick={isSubmit ? undefined : onNext}
        type={isSubmit ? "submit" : "button"}
        sx={{
          backgroundColor: "#4fb66e",
          fontSize: "8pt",
          fontWeight: 600,
          px: 3,
        }}
      >
        {nextLabel}
      </Button>
    </Box>
  );
}