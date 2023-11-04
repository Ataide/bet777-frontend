import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { DialogTitle, Link, TextField } from "@mui/material";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { useEffect } from "react";
import RegisterStepper from "../steppers/register";

export default function RegisterDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { backgroundColor: "#1B1C1B" } }}
        maxWidth={"xs"}
        fullWidth
      >
        <DialogTitle sx={{ paddingRight: 1 }}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"end"}>
            <Typography variant="body1">
              Já possui uma conta?{" "}
              <Link textAlign={"end"} fontWeight={400}>
                Faça login aqui
              </Link>
            </Typography>
            <IconButton
              aria-label="close"
              onClick={onClose}
              sx={{
                color: (theme) => theme.palette.primary.main,
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>

        <DialogContent sx={{ p: 2 }}>
          <RegisterStepper />
        </DialogContent>
      </Dialog>
    </>
  );
}
