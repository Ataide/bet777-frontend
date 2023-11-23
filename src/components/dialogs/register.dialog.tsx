import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import { z } from "zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import { useEffect } from "react";
import RegisterStepper from "../steppers/register";
import { useLayout } from "../../hooks/useLayout";
import DialogTitle from "@mui/material/DialogTitle";
import Link from "@mui/material/Link/Link";

export default function RegisterDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { setOpenLogin } = useLayout();
  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{ sx: { backgroundColor: "#1B1C1B" } }}
        maxWidth={"xs"}
        fullWidth
      >
        <DialogTitle component={Box} sx={{ p: "8px !important" }}>
          <Box
            p={1}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"end"}
          >
            <Typography variant="caption">
              Já possui uma conta?{" "}
              <Link
                textAlign={"end"}
                onClick={() => {
                  onClose();
                  setOpenLogin(true);
                }}
                sx={{ cursor: "pointer" }}
                fontWeight={400}
                fontSize={12}
              >
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
          <RegisterStepper onClose={onClose} />
        </DialogContent>
      </Dialog>
    </>
  );
}
