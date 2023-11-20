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
import { CpfTextMask, OddFloatMask, PhoneTextMask } from "../masks/text.masks";
import { phoneRegex } from "../../utils/utils";
import { signUpUserFn } from "../../api/authApi";
import { useMutation } from "react-query";
import { toast } from "react-toastify";

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
    phone: z
      .string()
      .min(1, { message: "Insira seu telefone/Telefone" })
      .regex(
        new RegExp(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[0-9])[0-9]{3}\-?[0-9]{4}$/),
        { message: "Telefone inválido" }
      ),
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

export default function RegisterStepper({ onClose }: { onClose: () => void }) {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [anchorElPopoverPassword, setAnchorElPopoverPassword] =
    React.useState<HTMLButtonElement | null>(null);

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
    reset,
  } = useForm<RegisterInput>({
    mode: "onChange",
    resolver: zodResolver(registerInput),
  });

  const { mutate: callMutate, isLoading } = useMutation(
    (userData: RegisterInput) => signUpUserFn(userData),
    {
      onSuccess: (data) => {
        localStorage.setItem(
          "@bet777:token",
          JSON.parse(JSON.stringify(data.token))
        );

        toast.success("You successfully logged in");
        onClose();
      },
      onError: (error: any) => {
        console.log(error);
        if (Array.isArray((error as any).response.data.error)) {
          (error as any).response.data.error.forEach((el: any) =>
            toast.error(el.message, {
              position: "top-right",
            })
          );
        } else {
          toast.error((error as any).response.data.message, {
            position: "top-right",
          });
        }
      },
    }
  );

  const handleChangePixType = (event) => {
    setValue("pix_type", event.target.value);
  };

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    console.log(values);
    callMutate(values);
  };

  const handleOpenPasswordInfo = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElPopoverPassword(event.currentTarget);
  };

  const handleNext = () => {
    if (activeStep === 0) {
      trigger(["first_name", "last_name"]).then((isValid) => {
        if (isValid) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      });
    }
    if (activeStep === 1) {
      trigger(["email", "phone"]).then((isValid) => {
        if (isValid) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      });
    }
    if (activeStep === 2) {
      trigger(["username", "password", "password_confirmation"]).then(
        (isValid) => {
          if (isValid) {
            setActiveStep((prevActiveStep) => prevActiveStep + 1);
          }
        }
      );
    }
    if (activeStep === 3) {
      trigger(["cpf", "pix_type", "pix_key"]).then((isValid) => {
        if (isValid) {
          onSubmitHandler(getValues());
        }
      });
    }
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
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            gap={1}
          >
            <Typography variant="caption" sx={{ mt: 2 }}>
              {steps[activeStep]}
            </Typography>
            {activeStep === 0 && (
              <>
                <Controller
                  name="first_name"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      placeholder="Nome"
                      error={Boolean(errors.first_name)}
                      helperText={errors.first_name?.message}
                      InputLabelProps={{ shrink: false }}
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
                      placeholder="Sobrenome"
                      InputLabelProps={{ shrink: false }}
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
                      placeholder="Email"
                      error={Boolean(errors.email)}
                      helperText={errors.email?.message}
                      InputLabelProps={{ shrink: false }}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
                <Typography variant="caption">Número de telefone</Typography>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      InputProps={{
                        inputComponent: PhoneTextMask as any,
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
                      placeholder="(11) XXXXX-XXXX"
                      InputLabelProps={{ shrink: false }}
                      error={Boolean(errors.phone)}
                      helperText={errors.phone?.message}
                      inputRef={ref}
                      {...field}
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
                      placeholder="Usuário"
                      InputLabelProps={{ shrink: false }}
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
                      InputLabelProps={{ shrink: false }}
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
                      placeholder="Senha"
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
                      InputLabelProps={{ shrink: false }}
                      placeholder="Insira a senha novamente"
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
                      placeholder="Cpf"
                      error={Boolean(errors.cpf)}
                      helperText={errors.cpf?.message}
                      InputLabelProps={{ shrink: false }}
                      InputProps={{
                        inputComponent: CpfTextMask as any,
                      }}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />

                <FormControl>
                  <Typography variant="caption">
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
