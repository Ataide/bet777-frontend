import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FlamengoIcon } from "../icons/times";
import palmeiras from "../../assets/Palmeiras .png";
import { BASE_URL, DOMAIN_URL } from "../../api/authApi";
export default function Players({
  home,
  visitant,
  home_image,
  visitant_image,
}: {
  home: string;
  visitant: string;
  home_image: string;
  visitant_image: string;
}) {
  return (
    <Box display={"flex"} gap={1} alignItems={"center"}>
      <img src={DOMAIN_URL + home_image} width={40} height={40} alt="" />
      <Typography variant="body2" color="primary">
        {home}
      </Typography>
      {"vs"}
      <Typography variant="body2" color="primary">
        {visitant}
      </Typography>
      <img src={DOMAIN_URL + visitant_image} width={40} height={40} alt="" />
    </Box>
  );
}
