import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { Box, Typography, Paper, Avatar, Stack, Chip, IconButton } from "@mui/material";
import type { Funcionario } from "../types/Funcionario";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import { deleteDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export function Funcionario() {
  const { id } = useParams();
  const [funcionario, setFuncionario] = useState<Funcionario | null>(null);
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);

  async function buscarFuncionario() {
    if (!id) return;

    const docRef = doc(db, "funcionarios", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      setFuncionario({
        id: snapshot.id,
        ...(snapshot.data() as Omit<Funcionario, "id">),
      });
    }
  }

  useEffect(() => {
    buscarFuncionario();
  }, [id]);

  if (!funcionario) return <Typography>Carregando...</Typography>;

  async function excluirFuncionario() {
        if (!id) return;

        await deleteDoc(doc(db, "funcionarios", id));

        navigate("/", {
            state: {
            message: "Funcionário excluído com sucesso!",
            severity: "success",
            },
        });
    }

  return (
    <Paper
        sx={{
            p: 3,
            maxWidth: 600,
            margin: "auto",
            mt: 4
        }}
        >
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color:"#4fb66e" }}>
            Detalhes do Colaborador
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
                sx={{
                width: 48,
                height: 48,
                bgcolor: "#4fb66e",
                fontWeight: "bold"
                }}
            >
                {funcionario.nome.charAt(0).toUpperCase()}
            </Avatar>

            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {funcionario.nome}
            </Typography>
            </Stack>

            <Box>
                <IconButton sx={{ color: "#4fb66e" }} onClick={() => navigate(`/funcionario/editar/${funcionario.id}`)}>
                    <EditIcon />
                </IconButton>

                <IconButton sx={{ color: "#d32f2f" }} onClick={() => setOpenDelete(true)}>
                    <DeleteIcon />
                </IconButton>
            </Box>

        </Stack>

        <Box mt={3} display="flex" flexDirection="column" gap={1}>
            <Typography>
            <strong>Email:</strong> {funcionario.email}
            </Typography>

            <Typography>
            <strong>Departamento:</strong> {funcionario.departamento}
            </Typography>

            <Box>
            <strong>Status: </strong>
            {funcionario.status === "Ativo" ? (
                <Chip label="Ativo" color="success" size="small" />
            ) : (
                <Chip label="Inativo" color="error" size="small" />
            )}
            </Box>
        </Box>

        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
            <DialogTitle>Confirmar exclusão</DialogTitle>

            <DialogContent>
                <Typography>
                Tem certeza que deseja excluir este colaborador?
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button
                variant="outlined"
                onClick={() => setOpenDelete(false)}
                sx={{
                    color: "grey.700",
                    borderColor: "grey.400",
                }}
                >
                Cancelar
                </Button>

                <Button
                variant="contained"
                color="error"
                onClick={excluirFuncionario}
                >
                Excluir
                </Button>
            </DialogActions>
        </Dialog>
    </Paper>
  );
}