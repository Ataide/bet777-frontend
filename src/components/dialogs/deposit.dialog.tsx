import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import { useAuthUser } from "../../hooks/useAuthUser";
import InfoIcon from "@mui/icons-material/Info";
import Divider from "@mui/material/Divider/Divider";
import Alert from "@mui/material/Alert";
import CopyToClipboardButton from "../copyToClipboardButton";
import { IQrcode } from "../../api/types";
import { formatter } from "../../utils/utils";
import Confetty from "../confetti";
import { useQuery } from "react-query";
import { checkTransactionCompleteFn } from "../../services/WalletService";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

export default function DepositQrCodeDialog({
  qrcode,
  open,
  onClose,
}: {
  qrcode: IQrcode | null;
  open: boolean;
  onClose: () => void;
}) {
  const { width, height } = useWindowSize();
  const [isParty, setisParty] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("Aguardando depósito...");

  const { data, isError, isLoading } = useQuery(
    "checkTransactionComplete",
    () => checkTransactionCompleteFn(qrcode?.payment_id),
    {
      enabled: Boolean(qrcode),
      onSuccess: (data) => {
        if (data) {
          if (data.status === "aproved") {
            setisParty(true);
            setMessage("Pagamento aprovado.");
          }
        }
      },
    }
  );

  return (
    <>
      <Confetti
        run={isParty}
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={500}
      />
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { backgroundColor: "#1B1C1B" } }}
        maxWidth={"sm"}
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
        {qrcode && (
          <DialogContent>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              flexDirection={"column"}
            >
              <img src={qrcode.image} alt="qrcode" width={300} />
              <CopyToClipboardButton value={qrcode.text} />
            </Box>

            <Divider variant="fullWidth" color="primary" />
            <Box my={2}>
              <Typography variant="body2" color="initial" mb={2}>
                Destinatário:
              </Typography>
              <Typography variant="body2" color="initial" fontWeight={500}>
                Nome: STARK BANK S.A
              </Typography>
              <Typography variant="body2" color="initial" fontWeight={500}>
                CNPJ: 00.000.000/0001-72
              </Typography>
              <Typography variant="body2" color="initial" fontWeight={500}>
                Quantia: R$ {formatter.format(+qrcode.amount)}
              </Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button variant="outlined" color="primary">
                {message}
              </Button>
              <Alert variant="outlined" severity="warning" icon={<InfoIcon />}>
                O pagamento pode levar 30 minutos para ser processado, fique a
                vontade para fechar essa janela
              </Alert>
            </Box>
          </DialogContent>
        )}
      </Dialog>
    </>
  );
}
