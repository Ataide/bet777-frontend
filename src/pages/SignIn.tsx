import { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { zodResolver } from "@hookform/resolvers/zod";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import InputAdornment from "@mui/material/InputAdornment";
import styled from "@mui/material/styles/styled";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import TextField from "@mui/material/TextField";
import { z } from "zod";

import { useAuth } from "../hooks/useAuth";
import { ILoginRequest } from "../types";

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

const validationSchema = z.object({
  email: z.string().min(1, { message: "Email é obrigatório." }).email({
    message: "Email não é valido.",
  }),
  password: z
    .string()
    .min(6, { message: "A senha é curta demais, mínino de 6 caracteres." }),
});

type ValidationSchema = z.infer<typeof validationSchema>;

const FormLogin = () => {
  const navigate = useNavigate();
  const { Login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string>();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ValidationSchema>({
    resolver: zodResolver(validationSchema),
  });

  const onSubmit: SubmitHandler<ValidationSchema> = async (
    data: ILoginRequest
  ) => {
    setLoading(true);
    try {
      const result = await Login(data);
      if (result.status === 200) {
        navigate("/");
      }
    } catch (e: any) {
      //? #TODO: Verificar quando for a API.
      setApiError(() => e.response?.data?.errors);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (apiError) {
      setTimeout(() => {
        setApiError(undefined);
      }, 3000);
    }
  }, [apiError]);

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field: { ref, ...field } }) => (
          <TextField
            margin="normal"
            disabled={loading}
            fullWidth
            label="Email"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Email"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
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
            fullWidth
            disabled={loading}
            label="Senha"
            type="password"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PasswordIcon />
                </InputAdornment>
              ),
            }}
            placeholder="Senha"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            inputRef={ref}
            {...field}
          />
        )}
      />
      {apiError && <Alert severity="error">{apiError}</Alert>}

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Continuar
      </Button>
      <GoogleLogin
        className={"google-login"}
        clientId=""
        buttonText="Entrar com o Google"
        onSuccess={() => {
          console.log("Sucess");
        }}
        onFailure={() => {
          console.error("Error");
        }}
        cookiePolicy={"single_host_origin"}
      />

      <Box
        sx={{
          display: { xs: "none", sm: "flex", md: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 3,
        }}
      >
        <StyledLink to="/forgot-password">Esqueceu sua senha?</StyledLink>

        <StyledLink to="/register"> {"Realizar cadastro"}</StyledLink>

        {/* <Copyright sx={{ mt: 8 }} /> */}
      </Box>
    </Box>
  );
};

export default function SignInPage() {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container component="article" className="page" maxWidth="sm">
      <Box component={"header"}></Box>
      <Box component={"main"}>
        <FormLogin />
      </Box>

      <Box component={"footer"}>
        <Box
          sx={{
            display: { xs: "flex", sm: "none", md: "none" },
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: 3,
          }}
        >
          <StyledLink to="/forgot-password">Esqueceu sua senha?</StyledLink>
          <StyledLink to="/register"> {"Realizar cadastro"}</StyledLink>
          {/* <Copyright sx={{ mt: 8 }} /> */}
        </Box>
      </Box>
    </Container>
  );
}
