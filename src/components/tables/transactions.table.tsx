import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useQuery } from "react-query";
import { getWalletTransactionsFn } from "../../services/WalletService";
import Typography from "@mui/material/Typography";
import { TransactionType } from "../../enums";
import dayjs, { Dayjs } from "dayjs";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import DateField from "../date/datePicker";

export default function TransactionTable() {
  const [value, setValue] = React.useState("");
  const [date, setDate] = React.useState<Dayjs | null>(null);

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  const { data } = useQuery(["user-transaction", value, date], () =>
    getWalletTransactionsFn(value, date)
  );

  return (
    <>
      <Box display={"flex"} gap={2} mb={2}>
        <DateField value={date} onChange={(newValue) => setDate(newValue)} />

        <RadioGroup
          aria-labelledby="tipo-de-transacao"
          name="type"
          value={value}
          onChange={handleTypeChange}
          row
        >
          <FormControlLabel
            value="deposit"
            control={<Radio />}
            label="Depósitos"
          />
          <FormControlLabel
            value="withdraw"
            control={<Radio />}
            label="Saques"
          />
          <FormControlLabel value="" control={<Radio />} label="Todas" />
        </RadioGroup>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label="transacoes">
          <TableHead>
            <TableRow
              sx={{
                "& td, th": { border: 0 },
              }}
            >
              <TableCell sx={{ width: 250 }}>Data/Hora</TableCell>
              <TableCell align="right">Tipo</TableCell>
              <TableCell align="right">Quantia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="striped">
            {data &&
              data.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    "& td, th": { border: 0, fontWeight: 500 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {dayjs(row.created_at).format("DD/MM/YYYY HH:mm")}
                  </TableCell>
                  <TableCell align="right">
                    {TransactionType[row.type]}
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="primary">
                      R$ {(row.deposit + row.withdraw).toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
