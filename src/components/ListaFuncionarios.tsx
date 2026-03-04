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

export function ListaFuncionarios() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);

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
            <Typography variant="h6">
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
                        backgroundColor: "rgba(0, 0, 0, 0.05)", // cinza transparente
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
                        <TableRow key={f.id}>
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