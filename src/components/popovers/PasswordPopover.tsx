import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InfoIcon from "@mui/icons-material/Info";

export default function PasswordPopover({
  anchorEl,
  onClose,
}: {
  anchorEl: HTMLButtonElement | null;
  onClose: () => void;
}) {
  const open = Boolean(anchorEl);
  return (
    <>
      <Popover
        open={open}
        onClose={onClose}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          ".MuiTypography-root": {
            fontWeight: 400,
          },
        }}
      >
        <Typography sx={{ p: 2, fontWeight: 400 }}>
          Certifique-se que sua senha contem
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Letras maiúsculas e minúsculas" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Números" />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Mínimo 8 caracteres" />
          </ListItem>
        </List>
      </Popover>
    </>
  );
}
