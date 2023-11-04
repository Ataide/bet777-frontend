import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { FutebolIcon } from "../icons/sidebar";

interface ICheckboxList {
  gameType: number;
  gameTitle: string;
  oddTitle: string;
  oddPlayer: string;
  odd: number;
}

export default function CheckboxList({
  gameTitle,
  gameType,
  odd,
  oddPlayer,
  oddTitle,
}: ICheckboxList) {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      sx={{
        width: "100%",
        ".MuiListItemText-primary": { fontSize: "15px" },
        ".MuiListItemText-secondary": { color: "#fff", fontSize: "12px" },
      }}
    >
      {[0].map((value) => {
        const labelId = `checkbox-list-label-${value}`;

        return (
          <>
            <ListItem
              key={value}
              secondaryAction={
                <IconButton edge="end" aria-label="comments">
                  <Typography variant="body1" color="primary">
                    {odd}
                  </Typography>
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value)}
                dense
              >
                <ListItemIcon sx={{ display: "flex", alignItems: "center" }}>
                  <Checkbox
                    edge="start"
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    sx={{ color: "primary.main" }}
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                  <FutebolIcon />
                </ListItemIcon>
                <Box>
                  <ListItemText
                    sx={{ fontSize: "10px" }}
                    secondary={gameTitle}
                  />
                  <ListItemText primary={oddTitle} secondary={oddPlayer} />
                </Box>
              </ListItemButton>
            </ListItem>
          </>
        );
      })}
    </List>
  );
}
