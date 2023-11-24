import Grid from "@mui/material/Grid";
import { useQuery } from "react-query";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getClosedPapersFn, getOpenPapersFn } from "../../services/BetService";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccordionDetails from "@mui/material/AccordionDetails";
import Divider from "@mui/material/Divider";
import { IPaper } from "../../types";
import dayjs from "dayjs";
import { BetResult } from "../../enums";
import { formatter, getPalpitesFromBet } from "../../utils/utils";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Hidden from "@mui/material/Hidden";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

export default function BetsPage() {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} md={7} maxWidth={"sm"}>
      <Box p={{ xs: 2, md: 4 }}>
        <Box p={{ xs: 0, md: 4 }}>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="abertas-content"
              id="abertas-header"
            >
              <Typography>Apostas abertas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <OpenPapers />
            </AccordionDetails>
          </Accordion>
          <br />
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="fechadas-content"
              id="fechadas-header"
            >
              <Typography>Apostas fechadas</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ClosedPapers />
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>
    </Grid>
  );
}
interface IPaperInfoProps {
  paper: IPaper;
}

function PaperInfo({ paper }: IPaperInfoProps) {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <>
      <Paper sx={{ minHeight: "110px" }}>
        <Box>
          <Box display={"flex"} justifyContent={"space-between"} mb={1}>
            <Box display={"flex"}>
              <Typography variant="subtitle2" color="initial">
                Aposta:
              </Typography>
              <Typography variant="subtitle2" color="primary" ml={1}>
                {paper.quantity! > 1 ? "Múltipla" : "Única"}
              </Typography>
              <Typography variant="subtitle2" color="initial" ml={2}>
                Odd:
              </Typography>
              <Typography variant="subtitle2" color="primary" ml={1}>
                {paper.rate.toFixed(2)}
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

          <Box display={"flex"} justifyContent={"space-between"} mb={1}>
            <Box display={"flex"}>
              <Typography variant="subtitle2" color="initial">
                Palpite:
              </Typography>
              <Typography variant="subtitle2" color="primary" ml={1}>
                {getPalpitesFromBet(paper.bets)}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} mb={1}>
            <Box display={"flex"}>
              <Typography variant="subtitle2" color="initial">
                Jogos:
              </Typography>
              <Typography variant="subtitle2" color="primary" ml={1}>
                {paper.bets.length}
              </Typography>
            </Box>
            <Box display={"flex"}>
              <Typography variant="subtitle2" color="initial">
                Data da aposta:
              </Typography>
              <Typography variant="subtitle2" color="primary" ml={1}>
                {dayjs(paper.created_at).format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="subtitle2" color="initial" ml={1}>
                Hora:
              </Typography>
              <Typography variant="subtitle2" color="primary" ml={1}>
                {dayjs(paper.created_at).format("HH:mm")}
              </Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} mb={2}>
            <Box display={"flex"}>
              <Typography variant="subtitle2" color="initial">
                Valor:
              </Typography>
              <Typography variant="subtitle2" color="primary" ml={1}>
                {formatter.format(paper.amount)}
              </Typography>
            </Box>

            <Box display={"flex"}>
              <Typography variant="subtitle2" color="initial" ml={1}>
                Resultado:
              </Typography>
              <Typography
                variant="caption"
                sx={({ palette }) => ({
                  color:
                    paper.result === 0
                      ? palette.warning.main
                      : paper.result === 1
                      ? palette.primary.main
                      : palette.error.main,
                })}
                ml={1}
              >
                {BetResult[paper.result || 0]}
              </Typography>
            </Box>
          </Box>

          <Box display={"flex"}>
            <Typography variant="subtitle2" color="initial">
              Lucro possível:
            </Typography>
            <Typography variant="subtitle2" color="primary" ml={1}>
              R$ {paper.profit}
            </Typography>
          </Box>

          {paper?.bets &&
            paper.bets.map((bet, index) => (
              <div key={index}>
                {showDetails && (
                  <Paper
                    elevation={3}
                    sx={(theme) => ({
                      mb: 1,
                      p: 2,
                      backgroundColor: theme.palette.background.default,
                    })}
                  >
                    <Box display={"flex"} flexDirection={"row"} mb={0.5}>
                      <Typography variant="subtitle2" color="initial">
                        Odd:
                      </Typography>
                      <Typography variant="subtitle2" color="primary" ml={1}>
                        {bet.rate}
                      </Typography>
                    </Box>
                    <Box display={"flex"} flexDirection={"row"} mb={0.5}>
                      <Typography variant="subtitle2" color="initial">
                        Palpite:
                      </Typography>
                      <Typography variant="subtitle2" color="primary" ml={1}>
                        {bet.bet_choice === 1
                          ? bet.game?.home_name
                          : bet.bet_choice === -1
                          ? bet.game?.away_name
                          : "Empate"}
                      </Typography>
                    </Box>

                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                      mb={0.5}
                    >
                      <Box display={"flex"}>
                        <Typography variant="subtitle2" color="initial">
                          Jogo:
                        </Typography>
                        <Typography variant="subtitle2" color="primary" ml={1}>
                          {bet.game?.home_name + " vs " + bet.game?.away_name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box
                      display={"flex"}
                      flexDirection={"row"}
                      justifyContent={"space-between"}
                    >
                      <Box display={"flex"}>
                        <Typography variant="subtitle2" color="initial">
                          Data do Jogo:
                        </Typography>
                        <Typography variant="subtitle2" color="primary" ml={1}>
                          {dayjs(bet.game?.time_close_bet).format(
                            "DD/MM/YYYY HH:mm"
                          )}
                        </Typography>
                      </Box>
                      <Box display={"flex"}>
                        <Typography variant="subtitle2" color="initial">
                          Resultado do jogo:
                        </Typography>
                        {bet.game && bet.game.done ? (
                          <>
                            {bet.bet_choice === +bet.game.result ? (
                              <Typography
                                variant="subtitle2"
                                color="primary"
                                ml={1}
                              >
                                Vitória
                              </Typography>
                            ) : (
                              <Typography
                                variant="subtitle2"
                                color="error"
                                ml={1}
                              >
                                Derrota
                              </Typography>
                            )}
                          </>
                        ) : (
                          <Typography
                            variant="subtitle2"
                            color="warning"
                            ml={1}
                          >
                            Aberto
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  </Paper>
                )}
              </div>
            ))}
        </Box>
        <Divider
          variant="fullWidth"
          sx={({ palette }) => ({
            my: 2,
            borderColor: palette.primary.main,
          })}
        />
      </Paper>
    </>
  );
}

function OpenPapers() {
  const { isLoading, isError, data, error } = useQuery(
    "open-papers",
    getOpenPapersFn
  );

  return data?.length ? (
    data.map((paper, index) => (
      <div key={index}>
        <PaperInfo paper={paper} />
      </div>
    ))
  ) : (
    <Box p={2}>
      <Typography variant="body2" color="grey" textAlign={"center"}>
        Não há dados
      </Typography>
    </Box>
  );
}

function ClosedPapers() {
  const { isLoading, isError, data, error } = useQuery(
    "closed-papers",
    getClosedPapersFn
  );
  return data?.length ? (
    data.map((paper, index) => (
      <div key={index}>
        <PaperInfo paper={paper} />
      </div>
    ))
  ) : (
    <Box p={2}>
      <Typography variant="body2" color="grey" textAlign={"center"}>
        Não há dados
      </Typography>
    </Box>
  );
}
