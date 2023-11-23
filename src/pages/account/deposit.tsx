import Grid from "@mui/material/Grid";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { IPaper, IWallet } from "../../types";
import InputAdornment from "@mui/material/InputAdornment";
import { useAuthUser } from "../../hooks/useAuthUser";
import { toast } from "react-toastify";
import { depositToWalletFn } from "../../services/WalletService";
import { CurrencyMask } from "../../components/masks/text.masks";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Hidden from "@mui/material/Hidden";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

const depositInput = z.object({
  name: z.string().min(1, { message: "Digite seu nome." }),
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
    useState(true);
  const navigate = useNavigate();
  const { user } = useAuthUser();

  const {
    control,
    handleSubmit,
    setValue,
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

  useEffect(() => {
    setValue("type", "deposit");
  }, []);

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
      toast.success("Depósito realizado com sucesso.", {
        position: "top-right",
      });

      // queryClient.invalidateQueries(["wallet", "authUser"]);

      // setValue("amount", "0");
      window.location.reload();
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

  return (
    <>
      <Grid container>
        <Hidden smDown>
          <Grid item xs={3}>
            <Box p={4}>
              <Paper>
                <MenuList sx={{ p: 2 }}>
                  <MenuItem onClick={() => navigate("/conta")}>Conta</MenuItem>
                  <MenuItem onClick={() => navigate("/conta/bets")}>
                    Minhas bets
                  </MenuItem>
                  <MenuItem selected>Depósitos</MenuItem>
                  <MenuItem onClick={() => navigate("/conta/saque")}>
                    Saques
                  </MenuItem>
                  <MenuItem onClick={() => navigate("/conta/transacoes")}>
                    Transações
                  </MenuItem>
                  <MenuItem>Pix</MenuItem>
                </MenuList>
              </Paper>
            </Box>
          </Grid>
        </Hidden>

        <Grid item xs={12} md={7}>
          <Box p={{ xs: 2, md: 4 }}>
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
                  <div>
                    <Typography variant="caption" ml={1}>
                      Nome
                    </Typography>
                    <Controller
                      name="name"
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

                  <Box
                    display={"flex"}
                    gap={4}
                    justifyContent={"center"}
                    mb={3}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => setValue("amount", "25")}
                    >
                      R$ 25
                    </Button>
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
                      Depositar
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      <Paper
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: { sm: "none" },
          zIndex: 100,
        }}
        elevation={3}
      >
        <BottomNavigation
          showLabels={false}
          value={"/conta/deposito"}
          onChange={(e, newValue) => {
            setTimeout(() => {
              navigate(newValue);
            }, 500);
          }}
        >
          <BottomNavigationAction value="/conta" icon={<AccountBoxIcon />} />
          <BottomNavigationAction value="/conta/bets" icon={<ListAltIcon />} />
          <BottomNavigationAction
            value="/conta/deposito"
            icon={<AccountBalanceIcon />}
          />
          <BottomNavigationAction
            value="/conta/saque"
            icon={<CurrencyExchangeIcon />}
          />
          <BottomNavigationAction
            value="/conta/transacoes"
            icon={<ReceiptLongIcon />}
          />
        </BottomNavigation>
      </Paper>
    </>
  );
}
interface IPaperInfoProps {
  paper: IPaper;
}
