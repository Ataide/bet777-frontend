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

export default function WithdrawConfirmationDialog({
  amount,
  open,
  onClose,
}: {
  amount: number;
  open: boolean;
  onClose: () => void;
}) {
  const { user } = useAuthUser();

  useEffect(() => {
    // reset();
  }, [open]);

  return (
    <>
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
        <DialogContent>
          <Box my={2}>
            <Typography variant="body2" color="initial" mb={2}>
              Pagador
            </Typography>
            <Typography variant="body2" color="initial" fontWeight={500}>
              Nome: STARK BANK S.A
            </Typography>
            <Typography variant="body2" color="initial" fontWeight={500}>
              CNPJ: 00.000.000/0001-72
            </Typography>
            <Typography variant="body2" color="initial" fontWeight={500}>
              Quantia: R$ {amount.toFixed(2)}
            </Typography>
          </Box>
          <Divider variant="fullWidth" color="primary" />
          <Box my={2}>
            <Typography variant="body2" color="initial" mb={2}>
              Destinatário:
            </Typography>
            <Typography variant="body2" color="initial" fontWeight={500}>
              Nome:{user.name}
            </Typography>
            <Typography variant="body2" color="initial" fontWeight={500}>
              CPF: {user.profile.cpf}
            </Typography>
            <Typography variant="body2" color="initial" fontWeight={500}>
              Chave pix: {user.profile.pix_key}
            </Typography>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Button variant="outlined" color="primary">
              Aguardando deposito...
            </Button>
            <Alert variant="outlined" severity="warning" icon={<InfoIcon />}>
              O pagamento pode levar 30 minutos para ser processado, fique a
              vontade para fechar essa janela
            </Alert>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
