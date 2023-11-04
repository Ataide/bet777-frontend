import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import PasswordPopover from "../popovers/PasswordPopover";

const steps = [
  "Informação Pessoal",
  "Informações para Contato",
  "Criar login",
  "Informações de pagamento",
];

const registerInput = z
  .object({
    username: z.string().min(1, { message: "Insira seu usuario" }),
    first_name: z.string().min(1, { message: "Insira seu nome" }),
    last_name: z.string().min(1, { message: "Insira seu sobrenome" }),
    cpf: z.string().min(1, { message: "CPF invalido/CPF ja cadastrado" }),
    email: z.string().min(1, { message: "Email é obrigatório." }).email({
      message: "Email não é valido.",
    }),
    phone: z.string().min(1, { message: "Insira seu telefone/Telefone" }),
    pix_type: z.string().min(1, { message: "Selecione um meio pix" }),
    pix_key: z.string().min(1, { message: "Selecione um pix" }),
    password: z
      .string()
      .min(6, { message: "A senha é curta demais, mínino de 6 caracteres." }),
    password_confirmation: z
      .string()
      .min(1, { message: "Confirmação do password é obrigatória." }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ["confirmPassword"],
    message: "Password não batem.",
  });

export type RegisterInput = z.infer<typeof registerInput>;

export default function RegisterStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [anchorElPopoverPassword, setAnchorElPopoverPassword] =
    React.useState<HTMLButtonElement | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerInput),
  });

  const handleChangePixType = (event) => {
    setValue("pix_type", event.target.value);
  };

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    // ? Executing the loginUser Mutation
    console.log(values);
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleOpenPasswordInfo = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElPopoverPassword(event.currentTarget);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: "100%" }} p={2}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}></StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}> {steps[activeStep]}</Typography>
          <Box
            component="form"
            id="form_"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            gap={1}
          >
            {activeStep === 0 && (
              <>
                <Controller
                  name="first_name"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      // disabled={isLoading}
                      fullWidth
                      label="Nome"
                      error={Boolean(errors.first_name)}
                      helperText={errors.first_name?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="last_name"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      // disabled={isLoading}
                      fullWidth
                      label="Sobrenome"
                      error={Boolean(errors.last_name)}
                      helperText={errors.last_name?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
              </>
            )}

            {activeStep === 1 && (
              <>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      // disabled={isLoading}
                      fullWidth
                      label="Email"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
                <Typography variant="body1">Número de telefone</Typography>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      fullWidth
                      required
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography
                              variant="body1"
                              fontWeight={400}
                              sx={{ color: "#fff" }}
                            >
                              +55
                            </Typography>
                          </InputAdornment>
                        ),
                      }}
                      id="phone"
                      label="Celular"
                      error={Boolean(errors.email)}
                      helperText={errors.phone?.message}
                    />
                  )}
                />
              </>
            )}

            {activeStep === 2 && (
              <>
                <Controller
                  name="username"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      // disabled={isLoading}
                      fullWidth
                      label="Usuário"
                      error={Boolean(errors.username)}
                      helperText={errors.username?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />

                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      type="password"
                      // disabled={isLoading}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <IconButton
                              aria-label="delete"
                              onClick={handleOpenPasswordInfo}
                            >
                              <InfoIcon color="primary" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      fullWidth
                      label="Senha"
                      error={Boolean(errors.password)}
                      helperText={errors.password?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
                <PasswordPopover
                  anchorEl={anchorElPopoverPassword}
                  onClose={() => {
                    setAnchorElPopoverPassword(null);
                  }}
                />

                <Controller
                  name="password_confirmation"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      type="password"
                      // disabled={isLoading}
                      fullWidth
                      label="Insira a senha novamente"
                      error={Boolean(errors.password_confirmation)}
                      helperText={errors.password_confirmation?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
              </>
            )}

            {activeStep === 3 && (
              <>
                <Controller
                  name="cpf"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      // disabled={isLoading}
                      fullWidth
                      label="Cpf"
                      error={Boolean(errors.cpf)}
                      helperText={errors.cpf?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />

                <FormControl>
                  <Typography variant="body1">
                    Selecione o tipo de chave pix
                  </Typography>
                  <RadioGroup
                    defaultValue="cpf"
                    name="radio-buttons-group"
                    onChange={handleChangePixType}
                  >
                    <FormControlLabel
                      value="cpf"
                      control={<Radio color={"primary"} />}
                      label="CPF"
                    />
                    <FormControlLabel
                      value="email"
                      control={<Radio />}
                      label="Email"
                    />
                    <FormControlLabel
                      value="phone"
                      control={<Radio />}
                      label="Numero de celular"
                    />
                    <FormControlLabel
                      value="random"
                      control={<Radio />}
                      label="Chave aleatória "
                    />
                  </RadioGroup>
                </FormControl>
                <Controller
                  name="pix_key"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      // disabled={isLoading}
                      fullWidth
                      label="Chave Pix"
                      error={Boolean(errors.pix_key)}
                      helperText={errors.pix_key?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
              </>
            )}
          </Box>

          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Button
              color="primary"
              variant="contained"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1, flex: 1 }}
            >
              Voltar
            </Button>
            {/* <Box sx={{ flex: "1 1 auto" }} /> */}

            <Button
              sx={{ flex: 1 }}
              color="primary"
              variant="contained"
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? "Finalizar" : "Próximo"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
