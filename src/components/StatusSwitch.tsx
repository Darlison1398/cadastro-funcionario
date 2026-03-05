import { Stack, Typography, Switch } from "@mui/material";
import { styled } from "@mui/material/styles";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",

  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },

  "& .MuiSwitch-switchBase": {
    padding: 2,

    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",

      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#4fb66e",
      },
    },
  },

  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
  },

  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: "rgba(0,0,0,.25)",
  },
}));

type StatusSwitchProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
};

export default function StatusSwitch({
  value,
  onChange,
  label = "Ativar ao criar",
}: StatusSwitchProps) {
  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <AntSwitch
        checked={value === "Ativo"}
        onChange={(e) => onChange(e.target.checked ? "Ativo" : "Inativo")}
      />
      <Typography>{label}</Typography>
    </Stack>
  );
}