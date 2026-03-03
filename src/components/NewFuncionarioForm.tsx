import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { Funcionario } from '../types/Funcionario';
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate } from "react-router-dom";
import { Button, MenuItem, Stack, styled, Switch, Typography } from '@mui/material';

const departamento = [
    {
        value : 'Ti',
        label : 'Ti'
    },
    {
        value : 'Design',
        label : 'Design'
    },
    {
        value : 'Produto',
        label : 'Produto'
    },
    {
        value : 'Marketing',
        label : 'Marketing'
    },
    {
        value : 'Administrativo',
        label : 'Administrativo'
    }
]

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15,
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)',
    },
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: '#1890ff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#177ddc',
        }),
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200,
    }),
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor: 'rgba(0,0,0,.25)',
    boxSizing: 'border-box',
    ...theme.applyStyles('dark', {
      backgroundColor: 'rgba(255,255,255,.35)',
    }),
  },
}));

export function NewFuncionarioForm() {
    const navigate = useNavigate();
    const [form, setForm] = useState<Funcionario>({
        nome: "",
        email: "",
        departamento: "",
        status: "Ativo"
    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        setForm({
        ...form,
        [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
    
        try {
          await addDoc(collection(db, "funcionarios"), form);
          alert("Funcionário cadastrado com sucesso!");
    
          setForm({
            nome: "",
            email: "",
            departamento: "",
            status: "Ativo"
          });
          navigate("/");
        } catch (error) {
          console.error(error);
          alert("Erro ao cadastrar funcionário");
        }
    }

    return (
        <Box
            component="form"
            sx={{ '& .MuiTextField-root': { m: 1, width: '50ch' } }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div>
                <TextField
                    required
                    id="outlined-required"
                    label="Nome"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    fullWidth
                />
                <TextField
                    required
                    id="outlined-required"
                    label="Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    fullWidth
                />
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center', m: 1 }}>
                    <AntSwitch
                        checked={form.status === "Ativo"}
                        onChange={(e) =>
                        setForm({ ...form, status: e.target.checked ? "Ativo" : "Inativo" })
                        }
                    />
                    <Typography>Ativar ao criar</Typography>
                </Stack>
                <TextField
                    select
                    label="Departamento"
                    name="departamento"
                    value={form.departamento || ""}
                    onChange={handleChange}
                    helperText="Selecione um departamento."
                    fullWidth
                    >
                    <MenuItem value="">
                        <em>Selecione…</em>
                    </MenuItem>

                    {departamento.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>

            <Button variant="contained" color="primary" type="submit">
                Cadastrar
            </Button>
            <Button variant="outlined" onClick={() => navigate("/")}>
              Voltar
            </Button>
        </Box>
    );
}
