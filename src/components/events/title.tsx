import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { changeFavoriteFn } from "../../services/EventService";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { StarIcon, StarOutLineIcon } from "../icons/general";
import { useLayout } from "../../hooks/useLayout";
import { useAuthUser } from "../../hooks/useAuthUser";

export default function Title({
  title,
  breadcrumb,
  isFavorite = false,
}: {
  title: string;
  breadcrumb?: string;
  isFavorite?: boolean;
}) {
  const [isSelected, setSelected] = useState(isFavorite);
  const { setOpenLogin } = useLayout();
  const { user } = useAuthUser();
  const queryClient = useQueryClient();

  const { mutate: changeFavorite } = useMutation(
    (sportName: string) => changeFavoriteFn(sportName),
    {
      onSuccess: (data) => {
        setSelected(!isSelected);
        queryClient.invalidateQueries("authUser");
      },
    }
  );

  return (
    <Box px={4}>
      <Box>
        <Box display={"flex"}>
          <Typography variant="h3">{title}</Typography>
          <IconButton
            onClick={() => {
              if (!user) {
                setOpenLogin(true);
                return;
              }
              changeFavorite(title);
            }}
          >
            {isSelected ? <StarIcon /> : <StarOutLineIcon />}
          </IconButton>
        </Box>
        {breadcrumb && (
          <Box display={"flex"} gap={1}>
            <Typography fontWeight={400} variant="body2">
              Página Inicial
            </Typography>{" "}
            {" > "}
            <Typography fontWeight={400} variant="body2" color="primary">
              {breadcrumb}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
