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
        backgroundColor: '#4fb66eff',
        ...theme.applyStyles('dark', {
          backgroundColor: '#4fb66eff',
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
    const [step, setStep] = useState(1);
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
          sx={{ '& .MuiTextField-root': { m: 1, width: '100ch', borderColor: "#4fb66eff" } }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {step === 1 && (
            <>
              <h1 style={{ color:"#8b8888ff", margin: "10px", fontFamily: "sans-serif"}}>Informações básicas</h1>

              <Stack spacing={2}>
                <TextField
                  required
                  label="Nome"
                  name="nome"
                  value={form.nome}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    "& label.Mui-focused": {
                      color: "#4fb66e",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#4fb66e",
                      },
                      "&:hover fieldset": {
                        borderColor: "#4fb66e",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4fb66e",
                      },
                    },
                  }}
                />

                <TextField
                  required
                  label="Email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  fullWidth
                  sx={{
                    "& label.Mui-focused": {
                      color: "#4fb66e",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#4fb66e",
                      },
                      "&:hover fieldset": {
                        borderColor: "#4fb66e",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4fb66e",
                      },
                    },
                  }}
                />

                <Stack direction="row" spacing={1} sx={{ alignItems: "center"}}>
                  <AntSwitch
                    checked={form.status === "Ativo"}
                    onChange={(e) =>
                      setForm({ ...form, status: e.target.checked ? "Ativo" : "Inativo" })
                    }
                  />
                  <Typography>Ativar ao criar</Typography>
                </Stack>

                <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={() => navigate("/")}
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
                    onClick={() => setStep(2)}
                    sx={{
                      backgroundColor: "#4fb66eff",
                      fontSize: "8pt",
                      fontWeight: 600,
                      px: 3,
                    }}
                  >
                    Próximo
                  </Button>
                </Box>
              </Stack>
            </>
          )}
          {step === 2 && (
            <>
              <h3>Informações profissionais</h3>

              <TextField
                select
                label="Departamento"
                name="departamento"
                value={form.departamento || ""}
                onChange={handleChange}
                fullWidth
                sx={{
                    "& label.Mui-focused": {
                      color: "#4fb66e",
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: "#4fb66e",
                      },
                      "&:hover fieldset": {
                        borderColor: "#4fb66e",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "#4fb66e",
                      },
                    },
                  }}
              >
                <MenuItem value="">
                  <em>Selecione um departamento</em>
                </MenuItem>

                {departamento.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>

              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
                <Button 
                  variant="outlined" 
                  onClick={() => setStep(1)}
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
                  type="submit"
                  sx={{
                    backgroundColor: "#4fb66eff",
                    fontSize: "8pt",
                    fontWeight: 600,
                    px: 3,
                  }}
                >
                  Cadastrar
                </Button>
              </Box>
            </>
          )}

        </Box>
    );
}
