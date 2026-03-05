import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomTextField from "../components/CustomTextField";
import type { Funcionario } from "../types/Funcionario";
import StatusSwitch from "../components/StatusSwitch";

export function EditarFuncionario() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<Funcionario>({
    nome: "",
    email: "",
    departamento: "",
    status: "Ativo",
  });

  async function buscarFuncionario() {
    if (!id) return;

    const docRef = doc(db, "funcionarios", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      setForm(snapshot.data() as Funcionario);
    }
  }

  useEffect(() => {
    buscarFuncionario();
  }, [id]);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!id) return;

    //await updateDoc(doc(db, "funcionarios", id), form);
    await updateDoc(doc(db, "funcionarios", id), { ...form });

    navigate("/", {
      state: {
        message: "Funcionário atualizado com sucesso!",
        severity: "success",
      },
    });
  }

  return (
    <Box component="form" onSubmit={handleSubmit} maxWidth={500} mx="auto" mt={4}>

      <Typography variant="h6" mb={2}>
        Editar colaborador
      </Typography>

        <Stack spacing={2}>
            <CustomTextField
                label="Nome"
                name="nome"
                value={form.nome}
                onChange={handleChange}
            />

            <CustomTextField
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
            />

            <CustomTextField
                label="Departamento"
                name="departamento"
                value={form.departamento}
                onChange={handleChange}
            />
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 2 }}>
                <StatusSwitch
                    value={form.status}
                    onChange={(value) =>
                        setForm({
                            ...form,
                            status: value,
                        })
                    }
                />
                <Typography>Ativar funcionário</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                >
                    Voltar
                </Button>

                <Button
                    variant="contained"
                    type="submit"
                    sx={{ backgroundColor: "#4fb66e" }}
                >
                    Salvar
                </Button>
            </Stack>
        </Stack>
    </Box>
  );
}