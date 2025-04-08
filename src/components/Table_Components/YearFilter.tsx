import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface YearFilterProps {
  selectedYear: string;
  uniqueYears: number[];
  onYearChange: (year: string) => void;
}

const YearFilter = ({
  selectedYear,
  uniqueYears,
  onYearChange,
}: YearFilterProps) => (
  <FormControl sx={{ minWidth: 150, mb: 2 }}>
    <InputLabel id="release-year-label">Release Year</InputLabel>
    <Select
      labelId="release-year-label"
      value={selectedYear}
      onChange={(e) => onYearChange(e.target.value)}
      label="Release Year"
    >
      <MenuItem value="">All</MenuItem>
      {uniqueYears.map((year) => (
        <MenuItem key={year} value={year.toString()}>
          {year}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

export default YearFilter;
