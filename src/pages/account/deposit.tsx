import { zodResolver } from "@hookform/resolvers/zod";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { z } from "zod";
import { CurrencyMask } from "../../components/masks/text.masks";
import { useAuthUser } from "../../hooks/useAuthUser";

import { depositToWalletFn } from "../../services/WalletService";
import { IPaper } from "../../types";
import Hidden from "@mui/material/Hidden";
import DepositQrCodeDialog from "../../components/dialogs/deposit.dialog";
import { IQrcode, IResponseDeposit } from "../../api/types";
import LoadingButton from "@mui/lab/LoadingButton";

const depositInput = z.object({
  name: z.string().optional(),
  amount: z.string().min(1, { message: "Valor deve será maior que 10" }),
  wallet_id: z.number().min(1, { message: "Id da carteira é obrigatório" }),
  type: z
    .string()
    .min(1, { message: "Tipo da transação é obrigatório" })
    .optional(),
});

export type IDepositInput = z.infer<typeof depositInput>;

export default function DepositPage() {
  const [openDepositConfirmDialog, setOpenDepositConfirmDialog] =
    useState(false);
  const [qrcode, setQrcode] = useState<IQrcode | null>(null);
  const navigate = useNavigate();
  const { user } = useAuthUser();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<IDepositInput>({
    resolver: zodResolver(depositInput),
    defaultValues: {
      name: user.name,
      wallet_id: user.wallet.id,
      type: "deposit",
    },
  });

  const onSubmitHandler: SubmitHandler<IDepositInput> = async (
    values: IDepositInput
  ) => {
    callMutate(values);
  };
  const queryClient = useQueryClient();

  const {
    mutate: callMutate,
    isLoading,
    isError,
    error,
  } = useMutation((deposit: IDepositInput) => depositToWalletFn(deposit), {
    onSuccess: (data) => {
      // toast.success("Depósito realizado com sucesso.", {
      //   position: "top-right",
      // });

      setQrcode(() => data.qr_code);
      setOpenDepositConfirmDialog(true);

      // queryClient.invalidateQueries(["wallet", "authUser"]);

      // setValue("amount", "0");
      // window.location.reload();
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
  });

  const handleCloseDepositDialog = () => {
    setOpenDepositConfirmDialog(false);
    setQrcode(null);
  };

  return (
    <>
      <DepositQrCodeDialog
        qrcode={qrcode}
        open={openDepositConfirmDialog}
        onClose={handleCloseDepositDialog}
      />

      <Box p={{ xs: 2, md: 4 }} maxWidth={"sm"}>
        <Paper>
          <Box p={{ xs: 2, md: 4 }}>
            <Typography variant="h5"> Depósito para apostas</Typography>
            <Box
              component="form"
              id="form_"
              onSubmit={handleSubmit(onSubmitHandler)}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
              mt={2}
              gap={1}
            >
              <Controller
                name="type"
                control={control}
                defaultValue={"deposit"}
                render={({ field: { ref, ...field } }) => (
                  <input type="hidden" {...field} value={"deposit"} />
                )}
              />

              <div>
                <Typography variant="caption" ml={1}>
                  Nome
                </Typography>
                <Controller
                  name="name"
                  disabled
                  control={control}
                  defaultValue={""}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      placeholder="Nome"
                      error={Boolean(errors.name)}
                      helperText={errors.name?.message}
                      InputLabelProps={{ shrink: false }}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
              </div>
              <div>
                <Typography variant="caption" ml={1}>
                  Quantia
                </Typography>
                <Controller
                  name="amount"
                  control={control}
                  defaultValue={""}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      {...field}
                      margin="normal"
                      fullWidth
                      InputProps={{
                        inputComponent: CurrencyMask as any,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Typography
                              variant="body1"
                              fontWeight={400}
                              color={"primary"}
                            >
                              R$
                            </Typography>
                            <hr
                              style={{
                                height: "35px",
                                marginLeft: "7px",
                                borderColor: "#07bc0c",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(errors.amount)}
                      helperText={errors.amount?.message}
                      inputRef={ref}
                    />
                  )}
                />
              </div>

              <Box display={"flex"} gap={4} justifyContent={"center"} mb={3}>
                <Hidden mdDown>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setValue("amount", "25")}
                  >
                    R$ 25
                  </Button>
                </Hidden>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setValue("amount", "50")}
                >
                  R$ 50
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setValue("amount", "75")}
                >
                  R$ 75
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setValue("amount", "100")}
                >
                  R$ 100
                </Button>
              </Box>
              <Box display={"flex"} justifyContent={"center"}>
                <LoadingButton
                  variant="outlined"
                  color="primary"
                  type="submit"
                  loading={isLoading}
                >
                  Depositar
                </LoadingButton>
                {/* <Button variant="outlined" color="primary" type="submit">
                  Depositar
                </Button> */}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
interface IPaperInfoProps {
  paper: IPaper;
}
