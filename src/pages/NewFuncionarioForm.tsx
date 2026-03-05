import Box from '@mui/material/Box';
import type { Funcionario } from '../types/Funcionario';
import { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { collection } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useNavigate } from "react-router-dom";
import { MenuItem, Stack, Typography } from '@mui/material';
import CustomTextField from '../components/CustomTextField';
import StatusSwitch from '../components/StatusSwitch';
import ButtonActions from '../components/ButtonActions';
import StepIndicatorVertical from '../components/StepIndicatorVertical';
import StepProgress from '../components/StepProgress';

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
          <StepProgress
            progress={progress}
            title="Colaboradores *"
            subtitle="Cadastrar Colaborador"
          />

          <Box sx={{ display: "flex", gap: 4 }}>
            <StepIndicatorVertical step={step} />
            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>

              {step === 1 && (
                <>
                  <Typography variant="h6" sx={{ color:"#8b8888" }}>
                    Informações básicas
                  </Typography>
                  <Stack spacing={2}>
                    <CustomTextField
                      required
                      label="Nome"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      error={errors.nome}
                      helperText={errors.nome ? "Nome é obrigatório" : ""}
                    />

                    <CustomTextField
                      required
                      label="Email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      error={errors.email}
                      helperText={errors.email ? "Email é obrigatório" : ""}
                    />

                    <Stack direction="row" spacing={1} sx={{ alignItems: "center"}}>
                      <StatusSwitch
                        value={form.status}
                        onChange={(value) => setForm({ ...form, status: value })}
                      />
                      <Typography>Ativar ao criar</Typography>
                    </Stack>

                    <ButtonActions
                      onBack={() => navigate("/")}
                      onNext={handleNextStep}
                      nextLabel="Próximo"
                    />
                  </Stack>
                </>
              )}
              {step === 2 && (
                <> 
                  <Typography variant="h6" sx={{ color:"#8b8888" }}>
                    Informações Profissionais
                  </Typography>

                  <CustomTextField
                    select
                    label="Departamento"
                    name="departamento"
                    value={form.departamento || ""}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>Selecione um departamento</em>
                    </MenuItem>

                    {departamento.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </CustomTextField>

                  <ButtonActions
                    onBack={() => setStep(1)}
                    nextLabel="Cadastrar"
                    isSubmit
                  />
                </>
              )}
            </Box>
          </Box>
        </Box>
    );
}
