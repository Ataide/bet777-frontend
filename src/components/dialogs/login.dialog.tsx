import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { useEffect, useState } from "react";
import { ILoginRequest } from "../../types";
import { useStateContext } from "../../contexts";
import { useMutation, useQuery } from "react-query";
import { FORGOTPASSWORD_URL, getMeFn, loginUserFn } from "../../api/authApi";
import { toast } from "react-toastify";
import { useLayout } from "../../hooks/useLayout";
import Link from "@mui/material/Link/Link";
import TextField from "@mui/material/TextField";

const loginInput = z.object({
  email: z.string().min(1, { message: "Email é obrigatório." }).email({
    message: "Email não é valido.",
  }),
  password: z
    .string()
    .min(6, { message: "A senha é curta demais, mínino de 6 caracteres." }),
});

export type LoginInput = z.infer<typeof loginInput>;

export default function LoginDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const stateContext = useStateContext();

  // API Get Current Logged-in user
  const query = useQuery(["authUser"], getMeFn, {
    enabled: false,
    select: (data) => data,
    retry: 1,
    onSuccess: (data) => {
      stateContext.dispatch({ type: "SET_USER", payload: data });
    },
  });

  //  API Login Mutation
  const { mutate: loginUser, isLoading } = useMutation(
    (userData: LoginInput) => loginUserFn(userData),
    {
      onSuccess: (data) => {
        localStorage.setItem(
          "@bet777:token",
          JSON.parse(JSON.stringify(data.token))
        );
        query.refetch();
        toast.success("Atializado com sucesso");
        onClose();
      },
      onError: (error: any) => {
        //console.log(error);
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

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginInput),
  });

  const onSubmitHandler: SubmitHandler<LoginInput> = async (
    values: ILoginRequest
  ) => {
    loginUser(values);
  };

  useEffect(() => {
    reset();
  }, [open]);

  const { setOpenRegister } = useLayout();

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { backgroundColor: "#1B1C1B" } }}
        maxWidth={"xs"}
        fullWidth
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.primary.main,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
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
            <Box textAlign={"center"}>
              <Typography variant="h5">Entre na sua conta</Typography>
              <Typography variant="h6" fontWeight={400}>
                Não tem conta?
                <Link
                  onClick={() => {
                    onClose();
                    setOpenRegister(true);
                  }}
                  sx={{ cursor: "pointer" }}
                  color={"primary"}
                >
                  cadastre-se
                </Link>
              </Typography>
            </Box>

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
            <Controller
              name="password"
              control={control}
              defaultValue=""
              render={({ field: { ref, ...field } }) => (
                <TextField
                  margin="normal"
                  type="password"
                  // disabled={isLoading}
                  fullWidth
                  label="Password"
                  error={Boolean(errors.password)}
                  helperText={errors.password?.message}
                  inputRef={ref}
                  {...field}
                />
              )}
            />
            <Link textAlign={"end"} fontWeight={400} href={FORGOTPASSWORD_URL}>
              Esqueci a senha
            </Link>
            <Box textAlign={"center"} mt={2}>
              <Button
                variant="contained"
                type="submit"
                sx={{ width: "132px", fontWeight: 700 }}
              >
                Entrar
              </Button>

              <Box mt={2}>
                <IconButton size="large" aria-label="google" color="primary">
                  <GoogleIcon sx={{ width: "40px", height: "40px" }} />
                </IconButton>
                <IconButton size="large" aria-label="facebook" color="primary">
                  <FacebookOutlinedIcon
                    sx={{ width: "40px", height: "40px" }}
                  />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
