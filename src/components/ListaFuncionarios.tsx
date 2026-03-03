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
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import type { Funcionario } from "../types/Funcionario";
import { useNavigate } from "react-router-dom";
import { Chip } from "@mui/material";

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
                mt: 5
            }}
            >
            <Typography variant="h6">
                Colaboradores
            </Typography>

            <Button variant="contained" onClick={() => navigate("/novo")}>
                Novo Colaborador
            </Button>
        </Box>
        <TableContainer component={Paper}>

        <Table>
            <TableHead>
            <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Status</TableCell>
            </TableRow>
            </TableHead>

            <TableBody>
                {funcionarios.map((f) => (
                    <TableRow key={f.id}>
                        <TableCell>{f.nome}</TableCell>
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