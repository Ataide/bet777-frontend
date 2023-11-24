import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import { z } from "zod";
import { updateProfileUserFn } from "../../api/authApi";
import {
  CpfTextMask,
  DateTextMask,
  PhoneTextMask,
} from "../../components/masks/text.masks";
import { useAuthUser } from "../../hooks/useAuthUser";

const profileInput = z.object({
  name: z.string().min(1, { message: "Insira seu usuario" }).optional(),
  birthday: z.string().optional(),
  cpf: z
    .string()
    .min(1, { message: "CPF invalido/CPF ja cadastrado" })
    .optional(),
  email: z
    .string()
    .min(1, { message: "Email é obrigatório" })
    .email({
      message: "Email não é valido.",
    })
    .optional(),
  phone: z
    .string()
    .min(1, { message: "Insira seu telefone/Telefone" })
    .optional(),
  pix_key: z.string().min(1, { message: "Selecione um pix" }).optional(),
});

export type ProfileInput = z.infer<typeof profileInput>;

export default function AccountPage() {
  const [editing, setEditing] = useState(false);
  const { user } = useAuthUser();
  const {
    control,
    handleSubmit,
    setValue,

    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<ProfileInput>({
    resolver: zodResolver(profileInput),
    defaultValues: {
      cpf: user.profile.cpf,
      email: user.email,
      birthday: user.profile.birthday,
      phone: user.profile.phone,
      pix_key: user.profile.pix_key,
      name: user.name,
    },
  });

  useEffect(() => {
    if (user) {
      setValue("birthday", user.profile.birthday || "");
      setValue("cpf", user.profile.cpf);
      setValue("email", user.email);
      setValue("phone", user.profile.phone);
      setValue("pix_key", user.profile.pix_key);
      setValue("name", user.name);
    }
  }, [user, editing]);

  const onSubmitHandler: SubmitHandler<ProfileInput> = async (values: any) => {
    callMutate(values);
  };
  const queryClient = useQueryClient();

  const { mutate: callMutate, isLoading } = useMutation(
    (userData: ProfileInput) => updateProfileUserFn(userData),
    {
      onSuccess: (data) => {
        toast.success("Atializado com sucesso");
        queryClient.invalidateQueries("authUser");
        setEditing(false);
      },
      onError: (error: any) => {
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

  return (
    <Box p={{ xs: 2, md: 4 }}>
      <Paper>
        <Box p={{ xs: 2, md: 4 }}>
          <Box
            component="form"
            id="form_edit"
            onSubmit={handleSubmit(onSubmitHandler)}
            noValidate
            sx={{
              mt: 1,
              display: "flex",
              flexDirection: "row",
            }}
            gap={2}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" color="white" fontWeight={600}>
                  Nome
                </Typography>
                <Controller
                  name="name"
                  control={control}
                  disabled={!editing}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      InputLabelProps={{ shrink: false }}
                      margin="normal"
                      // disabled={isLoading}
                      fullWidth
                      placeholder="Nome"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" color="white" fontWeight={600}>
                  Email
                </Typography>
                <Controller
                  name="email"
                  control={control}
                  disabled={!editing}
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
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" color="white" fontWeight={600}>
                  CPF
                </Typography>
                <Controller
                  name="cpf"
                  control={control}
                  disabled={!editing}
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
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" color="white" fontWeight={600}>
                  Usuário
                </Typography>
                <Controller
                  name="name"
                  control={control}
                  disabled={!editing}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      // disabled={isLoading}
                      fullWidth
                      placeholder="Usuário"
                      InputLabelProps={{ shrink: false }}
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="caption" color="white" fontWeight={600}>
                  Data de nascimento
                </Typography>
                <Controller
                  name="birthday"
                  control={control}
                  disabled={!editing}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      // disabled={isLoading}
                      fullWidth
                      placeholder="Birthday"
                      error={Boolean(errors.birthday)}
                      helperText={errors.birthday?.message}
                      InputLabelProps={{ shrink: false }}
                      InputProps={{
                        inputComponent: DateTextMask as any,
                      }}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" color="white" fontWeight={600}>
                  Chave Pix
                </Typography>
                <Controller
                  name="pix_key"
                  control={control}
                  disabled={!editing}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      placeholder="Pix_key"
                      error={Boolean(errors.pix_key)}
                      helperText={errors.pix_key?.message}
                      InputLabelProps={{ shrink: false }}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Typography variant="caption" color="white" fontWeight={600}>
                  Telefone
                </Typography>

                <Controller
                  name="phone"
                  control={control}
                  disabled={!editing}
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
              </Grid>
            </Grid>
          </Box>

          <Box py={4} display={"flex"} justifyContent={"end"}>
            {!editing && (
              <Button
                variant="outlined"
                onClick={() => {
                  setEditing(true);
                }}
              >
                Mudar informações
              </Button>
            )}
            {editing && (
              <>
                <Button variant="contained" type="submit" form="form_edit">
                  Salvar
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setEditing(false);
                  }}
                >
                  Cancelar
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
