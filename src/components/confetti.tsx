import Confetti from "react-confetti";
import useWindowSize from "react-use/lib/useWindowSize";

export default function Confetty() {
  const { width, height } = useWindowSize();
  return <Confetti width={width} height={height} />;
}
