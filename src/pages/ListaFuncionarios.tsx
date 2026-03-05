import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  Box,
  colors,
  TableSortLabel,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import type { Funcionario } from "../types/Funcionario";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";
import { Avatar, Stack } from "@mui/material";
import { Alert, Snackbar } from "@mui/material";
import { useLocation } from "react-router-dom";

export function ListaFuncionarios() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const location = useLocation();
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState<"success" | "error">("success");

  async function buscarFuncionarios() {
    const snapshot = await getDocs(collection(db, "funcionarios"));
    const lista: Funcionario[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Omit<Funcionario, "id">;

        return {
            id: doc.id,
            ...data,
        };
    });

    setFuncionarios(lista);
  }

  useEffect(() => {
    buscarFuncionarios();
  }, []);

  useEffect(() => {
    if (location.state?.message) {
        setAlertMessage(location.state.message);
        setAlertSeverity(location.state.severity);
        setAlertOpen(true);
    }
  }, [location.state]);

  return (
    <>
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2,
                mt: 3
            }}
            >
                <Snackbar
                    open={alertOpen}
                    autoHideDuration={4000}
                    onClose={() => setAlertOpen(false)}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    >
                    <Alert
                        onClose={() => setAlertOpen(false)}
                        severity={alertSeverity}
                        variant="filled"
                        sx={{ fontWeight: "bold" }}
                    >
                        {alertMessage}
                    </Alert>
                </Snackbar>


            <Typography variant="h6" sx={{ color:"#3f3d3dff", fontWeight: 600 }}>
                Colaboradores
            </Typography>

            <Button variant="contained" onClick={() => navigate("/novo")} style={{ backgroundColor: '#4fb66eff', fontSize: '8pt', fontWeight: 600, padding: '10px' }}>
                Novo Colaborador
            </Button>
        </Box>
        <TableContainer component={Paper}>
            <Table>
                <TableHead
                    sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.05)", 
                    }}
                >
                    <TableRow>
                        <TableCell>
                            <TableSortLabel active hideSortIcon={false} direction="desc">
                                Nome
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel active hideSortIcon={false} direction="desc">
                                Email
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel active hideSortIcon={false} direction="desc">
                                Departamento
                            </TableSortLabel>
                        </TableCell>
                        <TableCell>
                            <TableSortLabel active hideSortIcon={false} direction="desc">
                                Status
                            </TableSortLabel>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {funcionarios.map((f) => (
                        <TableRow 
                            key={f.id} 
                            hover
                            onClick={() => navigate(`/funcionario/${f.id}`)}
                            sx={{ cursor: "pointer" }}
                        >
                            <TableCell>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        bgcolor: "#4fb66e",
                                        fontSize: 14,
                                        fontWeight: "bold",
                                    }}
                                    >
                                    {f.nome.charAt(0).toUpperCase()}
                                    </Avatar> &nbsp;    
                                    {f.nome}
                                </Stack>
                            </TableCell>
                            <TableCell>{f.email}</TableCell>
                            <TableCell>{f.departamento}</TableCell>
                            <TableCell>
                                {f.status === "Ativo" ? (
                                    <Chip
                                    label="Ativo"
                                    color="success"
                                    size="small"
                                    sx={{ fontWeight: "bold" }}
                                    />
                                ) : (
                                    <Chip
                                    label="Inativo"
                                    color="error"
                                    size="small"
                                    sx={{ fontWeight: "bold" }}
                                    />
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    </>
  );
}