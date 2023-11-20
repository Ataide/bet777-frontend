import Grid from "@mui/material/Grid";
import { useQuery } from "react-query";
import { getFavoritesEventsFn } from "../../services/EventService";
import Events from "../../components/events/events";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

export default function BetsPage() {
  const navigate = useNavigate();
  return (
    <>
      <Grid container>
        <Grid item xs={3}>
          <Box p={4}>
            <Paper>
              <MenuList sx={{ p: 2 }}>
                <MenuItem onClick={() => navigate("/conta")}>Conta</MenuItem>
                <MenuItem selected>Minhas bets</MenuItem>
                <MenuItem onClick={() => navigate("/conta/deposito")}>
                  Depósitos
                </MenuItem>
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
        <Grid item xs={7}>
          <Box p={4}>
            <>
              <Box p={4}>
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
                {/* <Accordion disabled>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                  >
                    <Typography>Disabled Accordion</Typography>
                  </AccordionSummary>
                </Accordion> */}
              </Box>
            </>
          </Box>
        </Grid>
      </Grid>
    </>
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
        <Box p={0}>
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
                {paper.rate}
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
                {dayjs(paper.created_at).format("hh:mm")}
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
              <Typography variant="subtitle2" color="initial" ml={1}>
                Lucro possível:
              </Typography>
              <Typography variant="subtitle2" color="primary" ml={1}>
                R$ {paper.profit}
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
                            "DD/MM/YYYY hh:mm"
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
  return (
    data &&
    data.map((paper, index) => (
      <div key={index}>
        <PaperInfo paper={paper} />
      </div>
    ))
  );
}

function ClosedPapers() {
  const { isLoading, isError, data, error } = useQuery(
    "closed-papers",
    getClosedPapersFn
  );
  return (
    <>
      {data &&
        data.map((paper, index) => (
          <div key={index}>
            <PaperInfo paper={paper} />
          </div>
        ))}
    </>
  );
}
