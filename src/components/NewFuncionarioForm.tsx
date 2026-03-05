import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import type { Funcionario } from '../types/Funcionario';
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate } from "react-router-dom";
import { Button, MenuItem, Stack, styled, Switch, Typography } from '@mui/material';
import { LinearProgress } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

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
    
    const [errors, setErrors] = useState({
      nome: false,
      email: false,
    });

    const [form, setForm] = useState<Funcionario>({
        nome: "",
        email: "",
        departamento: "",
        status: "Ativo"
    });

    function handleNextStep() {
      const newErrors = {
        nome: form.nome.trim() === "",
        email: form.email.trim() === "",
      };

      setErrors(newErrors);

      // Se existir algum erro, não avança
      if (newErrors.nome || newErrors.email) return;

      setStep(2);
    }

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
          setForm({
            nome: "",
            email: "",
            departamento: "",
            status: "Ativo"
          });
          navigate("/", {
            state: {
              message: "Funcionário cadastrado com sucesso!",
              severity: "success",
            },
          });

        } catch (error) {
          navigate("/", {
            state: {
              message: "Erro ao cadastrar funcionário",
              severity: "error",
            },
          });
        }
    }

    const progress = step === 1 ? 50 : 100;
    function StepIndicatorVertical({ step }: { step: number }) {
      return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: "6em", width: "240px"}}>
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

    return (
        <Box
          component="form"
          sx={{ 
            '& .MuiTextField-root': { m: 1, width: '80ch', borderColor: "#4fb66eff" }
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <Box sx={{ mb: 3}}>
            <Box sx={{ display: "flex", gap:"20px" }}>
              <Typography variant="caption" color="text.secondary" >
                Colaboradores *
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Cadastrar Colaborador
              </Typography>
            </Box>

            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: 5,
                mt: 1,
                backgroundColor: "#e0e0e0",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: "#4fb66e",
                },
              }}
            />

            <Typography
              variant="caption"
              sx={{ display: "block", textAlign: "right", mt: 0.5 }}
            >
              {progress}%
            </Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 4 }}>
            <StepIndicatorVertical step={step} />
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>

              {step === 1 && (
                <>
                  <Typography variant="h6" sx={{ color:"#8b8888" }}>
                    Informações básicas
                  </Typography>
                  <Stack spacing={2}>
                    <TextField
                      required
                      label="Nome"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      fullWidth
                      error={errors.nome}
                      helperText={errors.nome ? "Nome é obrigatório" : ""}
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
                      error={errors.email}
                      helperText={errors.nome ? "Email é obrigatório" : ""}
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
                        onClick={() => handleNextStep()}
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
                  <Typography variant="h6" sx={{ color:"#8b8888" }}>
                    Informações Profissionais
                  </Typography>

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
          </Box>
        </Box>
    );
}
