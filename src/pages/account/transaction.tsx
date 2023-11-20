import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IPaper } from "../../types";
import { useAuthUser } from "../../hooks/useAuthUser";
import { toast } from "react-toastify";
import { withdrawWalletFn } from "../../services/WalletService";
import InfoIcon from "@mui/icons-material/Info";
import TransactionTable from "../../components/tables/transactions.table";
const withdrawInput = z.object({
  wallet_amount: z.string().min(1, { message: "Valor da carteira" }),
  amount: z.string().min(1, { message: "Valor deve será maior que 10" }),
  wallet_id: z.number().min(1, { message: "Id da carteira é obrigatório" }),
  type: z.string().min(1, { message: "Tipo da transação é obrigatório" }),
});

export type IWithdrawInput = z.infer<typeof withdrawInput>;

export default function TransactionsPage() {
  const navigate = useNavigate();
  const { user } = useAuthUser();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<IWithdrawInput>({
    resolver: zodResolver(withdrawInput),
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
      toast.success("Saque realizado com sucesso.", {
        position: "top-right",
      });
      queryClient.invalidateQueries("authUser");
      setValue("amount", "0");
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
    setValue("wallet_amount", user.wallet.amount.toFixed(2));
  }, [user]);

  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <Box p={4}>
            <Paper>
              <MenuList sx={{ p: 2 }}>
                <MenuItem onClick={() => navigate("/conta")}>Conta</MenuItem>
                <MenuItem onClick={() => navigate("/conta/bets")}>
                  Minhas bets
                </MenuItem>
                <MenuItem onClick={() => navigate("/conta/deposito")}>
                  Depósitos
                </MenuItem>
                <MenuItem onClick={() => navigate("/conta/saque")}>
                  Saques
                </MenuItem>
                <MenuItem selected>Transações</MenuItem>
                <MenuItem>Pix</MenuItem>
              </MenuList>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box pt={4}>
            <Paper>
              <Box p={4}>
                <Typography variant="h5" mb={4}>
                  Transações
                </Typography>
                <TransactionTable />
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
interface IPaperInfoProps {
  paper: IPaper;
}
