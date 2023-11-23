import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import { ZodNumber, z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect, useState } from "react";
import { IBetRequest, IPaper } from "../../types";
import { AppContext } from "../../contexts/AppContext";
import { useMutation, useQueryClient } from "react-query";
import { insertPaper } from "../../services/BetService";
import { toast } from "react-toastify";
import { CurrencyAmountMask, CurrencyMask } from "../masks/text.masks";
import { formatter } from "../../utils/utils";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Alert from "@mui/material/Alert";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const betInput = z.object({
  amount: z.string().min(1, { message: "Valor é obrigatório." }),
});

export type BetInput = z.infer<typeof betInput>;

export default function PaperCard() {
  const {
    paper,
    addBetToPaper,
    removeBetFromPaper,
    updatePaperAmount,
    updateOnlyProfit,
    clearPaper,
  } = useContext(AppContext);
  const queryClient = useQueryClient();
  const [showDetails, setShowDetails] = useState(true);
  const [_profit, set_Profit] = useState<number>(0);

  const onSubmitHandler: SubmitHandler<BetInput> = async (
    values: IBetRequest
  ) => {
    paper && callMutate(paper);
  };

  //  API Bet Mutation
  const {
    mutate: callMutate,
    isLoading,
    isError,
    error,
  } = useMutation((_paper: IPaper) => insertPaper(_paper), {
    onSuccess: (data) => {
      clearPaper();
      setValue("amount", "");
      // resetValuesInPaper();

      toast.success("Aposta realizada com sucesso.", {
        position: "top-right",
      });
      queryClient.invalidateQueries("wallet");
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

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<BetInput>({
    resolver: zodResolver(betInput),
    defaultValues: {
      amount: "",
    },
  });

  const onChangeBet = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amount = +e.target.value;
    // const paper_rate = paper ? paper.rate : 0;
    // const profit = amount * paper_rate;
    setValue("amount", String(amount));
    updatePaperAmount(amount);
  };

  useEffect(() => {
    updatePaperAmount(+getValues("amount"));
  }, [paper?.bets]);

  return (
    <>
      <Container component="article" disableGutters className="page">
        <Box
          component={"header"}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "53px",
            padding: "0px 10px",
            alignItems: "center",
            gap: "10px",
            backgroundColor: "primary.main",
            borderRadius: "10px 10px 0px 0px",
            color: "primary.contrastText",
            fontSize: "20px",
          }}
        >
          <Typography variant="body1" color="secondary">
            Sua aposta
          </Typography>
        </Box>
        <Box
          component={"main"}
          sx={{
            borderRadius: "10px",
          }}
        >
          {isError && (
            <Fade in={isError}>
              <Alert severity="error" variant="filled">
                Aposta inválida
              </Alert>
            </Fade>
          )}

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
            <Box display={"flex"} flexDirection={"column"} gap={2}>
              <Paper elevation={5}>
                {paper?.bets &&
                  paper.bets.map((bet, index) => (
                    <div key={index}>
                      {showDetails && (
                        <Box p={2}>
                          <Box display={"flex"} flexDirection={"row"} mb={1}>
                            <Typography variant="caption">Odd:</Typography>
                            <Typography
                              variant="caption"
                              color="primary"
                              ml={1}
                            >
                              {bet.rate}
                            </Typography>
                          </Box>
                          <Box display={"flex"} flexDirection={"row"} mb={1}>
                            <Typography variant="caption">Palpite:</Typography>
                            <Typography
                              variant="caption"
                              color="primary"
                              ml={1}
                            >
                              {bet.bet_choice_name}
                            </Typography>
                          </Box>

                          <Box
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                          >
                            <Box display={"flex"}>
                              <Typography variant="caption">Jogo:</Typography>
                              <Typography
                                variant="caption"
                                color="primary"
                                ml={1}
                              >
                                {bet.players}
                              </Typography>
                            </Box>
                            <Box display={"flex"}>
                              <Button
                                variant="text"
                                color="primary"
                                onClick={() => removeBetFromPaper(bet)}
                              >
                                cancelar
                              </Button>
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </div>
                  ))}
              </Paper>
            </Box>
          </Box>
        </Box>
        <Box component={"footer"} sx={{ backgroundColor: "secondary.main" }}>
          <Box p={1}>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Box display={"flex"}>
                <Typography variant="caption">Aposta:</Typography>
                <Typography variant="caption" color="primary" ml={1}>
                  {paper && paper?.bets.length > 1 ? "Múltipla" : "Única"}
                </Typography>
              </Box>
              <Box display={"flex"}>
                <Typography variant="caption">Odd:</Typography>
                <Typography variant="caption" color="primary" ml={1}>
                  {paper?.rate}
                </Typography>
              </Box>
              <Box display={"flex"}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  detalhes
                </Button>
              </Box>
            </Box>
            <Box display={"flex"}>
              <Typography variant="caption">Palpite:</Typography>
              <Typography variant="caption" color="primary" ml={1}>
                {paper?.rate}
              </Typography>
            </Box>
          </Box>
          <Divider
            sx={(theme) => ({ borderColor: theme.palette.primary.main })}
          ></Divider>
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"end"}
            p={2}
            pb={0}
          >
            <Box display={"flex"} flexDirection={"column"}>
              <Typography variant="caption">Valor da aposta:</Typography>

              <Controller
                name="amount"
                control={control}
                defaultValue={"0"}
                render={({ field: { ref, ...field } }) => (
                  <TextField
                    {...field}
                    sx={{ maxWidth: "166px" }}
                    margin="normal"
                    fullWidth
                    onChange={onChangeBet}
                    InputProps={{
                      inputComponent: CurrencyAmountMask as any,
                      startAdornment: (
                        <InputAdornment position="start">
                          <Typography
                            variant="body1"
                            fontWeight={400}
                            sx={{ color: "#fff" }}
                          >
                            R$
                          </Typography>
                        </InputAdornment>
                      ),
                    }}
                    error={Boolean(errors.amount)}
                    helperText={errors.amount?.message}
                    inputRef={ref}
                  />
                )}
              />
            </Box>
          </Box>

          <Box display={"flex"} p={2}>
            <Typography variant="caption">Lucro possível:</Typography>
            <Typography variant="caption" color="primary" ml={1}>
              {formatter.format(paper?.profit ?? 0)}
            </Typography>
          </Box>

          <Button
            fullWidth
            disabled={paper?.quantity ? false : true}
            onClick={handleSubmit(onSubmitHandler)}
            variant="contained"
            color="primary"
            sx={{
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              height: "52px",
            }}
          >
            <Typography>Fazer aposta</Typography>
          </Button>
        </Box>
      </Container>
    </>
  );
}
