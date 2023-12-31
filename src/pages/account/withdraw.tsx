import { zodResolver } from "@hookform/resolvers/zod";
import InfoIcon from "@mui/icons-material/Info";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Hidden from "@mui/material/Hidden";
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
import WithdrawConfirmationDialog from "../../components/dialogs/withdraw.dialog";
import { CurrencyMask } from "../../components/masks/text.masks";
import { useAuthUser } from "../../hooks/useAuthUser";
import { withdrawWalletFn } from "../../services/WalletService";
import { IPaper } from "../../types";

const withdrawInput = z.object({
  wallet_amount: z.string().min(1, { message: "Valor da carteira" }),
  amount: z
    .string()
    .transform((amount) => parseFloat(amount))
    .pipe(
      z
        .number()
        .min(10, { message: "Valor mínimo de R$ 10,00" })
        .max(200, { message: "Valor máximo de R$ 200,00" })
    )
    .transform((amount) => amount.toFixed(2)),
  wallet_id: z.number().min(1, { message: "Id da carteira é obrigatório" }),
  type: z.string().min(1, { message: "Tipo da transação é obrigatório" }),
});

export type IWithdrawInput = z.infer<typeof withdrawInput>;

export default function WithdrawPage() {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthUser();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<IWithdrawInput>({
    resolver: zodResolver(withdrawInput),
    defaultValues: {
      wallet_amount: user.wallet.draw_total.toFixed(2),
      wallet_id: user.wallet.id,
    },
  });

  const onSubmitHandler: SubmitHandler<IWithdrawInput> = async (
    values: IWithdrawInput
  ) => {
    callMutate(values);
  };
  const queryClient = useQueryClient();

  const {
    mutate: callMutate,
    isLoading,
    isError,
    error,
  } = useMutation((withdraw: IWithdrawInput) => withdrawWalletFn(withdraw), {
    onSuccess: (data) => {
      setOpenConfirmDialog(true);

      toast.success("Sua solicitação foi enviado. Aguardando aprovação.", {
        position: "top-right",
      });

      queryClient.invalidateQueries("authUser");
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

  useEffect(() => {
    setValue("type", "withdraw");
    setValue("wallet_amount", user.wallet.draw_total.toFixed(2));
  }, [user]);

  useEffect(() => {
    if (!openConfirmDialog) {
      setValue("amount", "0");
      setValue("type", "withdraw");
      setValue("wallet_amount", user.wallet.draw_total.toFixed(2));
    }
  }, [openConfirmDialog]);

  return (
    <>
      <WithdrawConfirmationDialog
        amount={Number.parseFloat(getValues("amount"))}
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
      />

      <Box p={{ xs: 2, md: 4 }} maxWidth={"sm"}>
        <Paper>
          <Box p={{ xs: 2, md: 4 }}>
            <Typography variant="h5"> Saque</Typography>
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
              <div>
                <Typography variant="caption" ml={1}>
                  Quantia disponível para saque
                </Typography>
                <Controller
                  name="wallet_amount"
                  control={control}
                  disabled={true}
                  render={({ field: { ref, ...field } }) => (
                    <TextField
                      margin="normal"
                      fullWidth
                      InputProps={{
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
                                borderColor: "#07bc0c",
                                marginLeft: "7px",
                              }}
                            />
                          </InputAdornment>
                        ),
                      }}
                      error={Boolean(errors.wallet_amount)}
                      helperText={errors.wallet_amount?.message}
                      inputRef={ref}
                      {...field}
                    />
                  )}
                />
              </div>

              <div>
                <Typography variant="caption" ml={1}>
                  Quantia que deseja sacar
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

              <Box display={"flex"} gap={4} justifyContent={"center"} mb={4}>
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
                <Button variant="outlined" color="primary" type="submit">
                  Sacar
                </Button>
              </Box>

              <Alert variant="outlined" severity="warning" icon={<InfoIcon />}>
                Saque mínimo de R$ 10,00 (dez reais).
              </Alert>
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
