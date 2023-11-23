import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import bannerUrl from "../../assets/banner_main.png";
import Box from "@mui/material/Box";
import {
  BaisebolIcon,
  BasqueteIcon,
  BoxeIcon,
  FutebolAIcon,
  FutebolIcon,
  Line,
  TenisIcon,
  VoleiIcon,
} from "../icons/banner";

import { useNavigate } from "react-router-dom";
import { Hidden } from "@mui/material";
import futebol from "../../assets/icons/futebol.png";
import volei from "../../assets/icons/volei.png";
import basquete from "../../assets/icons/basquete.png";

function ItemSports() {}

export default function MainBanner() {
  const navigate = useNavigate();

  return (
    <Card sx={{ borderRadius: "10px" }}>
      <CardMedia sx={{ height: 130 }} image={bannerUrl} title="Main Banner" />
      <Hidden mdUp implementation="css">
        <CardContent>
          <Box
            display={"flex"}
            gap={5}
            justifyContent={"center"}
            py={2}
            alignItems={"center"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={1}
              onClick={() => navigate("esportes/1")}
              sx={{
                ":hover": {
                  cursor: "pointer",
                  animation:
                    "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                },
              }}
            >
              <img src={futebol} alt="" width={30} />
              <Typography fontWeight={400}>Futebol</Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={1}
              onClick={() => navigate("esportes/2")}
              sx={{
                ":hover": {
                  cursor: "pointer",
                  animation:
                    "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                },
              }}
            >
              <img src={volei} alt="" width={30} />
              <Typography fontWeight={400}>Vôlei</Typography>
            </Box>
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={1}
              onClick={() => navigate("esportes/3")}
              sx={{
                ":hover": {
                  cursor: "pointer",
                  animation:
                    "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                },
              }}
            >
              <img src={basquete} alt="" width={30} />
              <Typography fontWeight={400}>Basquete</Typography>
            </Box>
          </Box>
        </CardContent>
      </Hidden>

      <Hidden mdDown implementation="css">
        <CardContent>
          <Box
            display={"flex"}
            gap={5}
            justifyContent={"center"}
            py={2}
            alignItems={"center"}
          >
            <Line />

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={1}
              onClick={() => navigate("esportes/1")}
              sx={{
                ":hover": {
                  cursor: "pointer",
                  animation:
                    "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                },
              }}
            >
              <FutebolIcon />
              <Typography fontWeight={400}>Futebol</Typography>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={1}
              onClick={() => navigate("esportes/2")}
              sx={{
                ":hover": {
                  cursor: "pointer",
                  animation:
                    "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                },
              }}
            >
              <VoleiIcon />
              <Typography fontWeight={400}>Volei</Typography>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={1}
              onClick={() => navigate("esportes/3")}
              sx={{
                ":hover": {
                  cursor: "pointer",
                  animation:
                    "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                },
              }}
            >
              <BasqueteIcon />
              <Typography fontWeight={400}>Basquete</Typography>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={1}
              onClick={() => navigate("esportes/7")}
              sx={{
                ":hover": {
                  cursor: "pointer",
                  animation:
                    "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                },
              }}
            >
              <TenisIcon />
              <Typography fontWeight={400}>Tênis</Typography>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={1}
              onClick={() => navigate("esportes/6")}
              sx={{
                ":hover": {
                  cursor: "pointer",
                  animation:
                    "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                },
              }}
            >
              <FutebolAIcon />
              <Typography fontWeight={400}>Fut. Americano</Typography>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={1}
              onClick={() => navigate("esportes/4")}
              sx={{
                ":hover": {
                  cursor: "pointer",
                  animation:
                    "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                },
              }}
            >
              <BaisebolIcon />
              <Typography fontWeight={400}>Beisebol</Typography>
            </Box>

            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              gap={1}
              onClick={() => navigate("esportes/5")}
              sx={{
                ":hover": {
                  cursor: "pointer",
                  animation:
                    "scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both",
                },
              }}
            >
              <BoxeIcon />
              <Typography fontWeight={400}>Boxe</Typography>
            </Box>

            <Line />
          </Box>
        </CardContent>
      </Hidden>
    </Card>
  );
}
