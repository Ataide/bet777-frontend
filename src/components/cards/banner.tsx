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

function ItemSports() {}

export default function MainBanner() {
  return (
    <Card sx={{ borderRadius: "10px" }}>
      <CardMedia sx={{ height: 330 }} image={bannerUrl} title="Main Banner" />
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
    </Card>
  );
}
