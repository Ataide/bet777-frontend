import { Button, Snackbar } from "@mui/material";
import { useState } from "react";

export default function CopyToClipboardButton({ value }: { value: string }) {
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(value);
  };

  return (
    <>
      <Button onClick={handleClick}>Copiar</Button>
      <Snackbar
        open={open}
        onClose={() => setOpen(false)}
        autoHideDuration={2000}
        message="Copiado para área de transferência"
      />
    </>
  );
}
