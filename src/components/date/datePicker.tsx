import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";

export interface IDateFieldProps {
  value: Dayjs | null;
  onChange: (value: Dayjs | null) => void;
}
export default function DateField({ value, onChange }: IDateFieldProps) {
  return (
    <DatePicker
      sx={({ palette }) => ({
        "& .MuiOutlinedInput-root": {
          color: palette.common.white,
          background: palette.background.default,
        },
        "& .MuiSvgIcon-root": {
          color: palette.primary.main,
        },
        ".MuiDayCalendar-weekDayLabel": {
          color: palette.primary.main,
        },
      })}
      value={value}
      onChange={onChange}
    />
  );
}
