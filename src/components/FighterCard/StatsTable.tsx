import { Box, Divider, ListItem, Stack, styled } from "@mui/material";

const Item = styled(Box)(({ theme }) => ({
  backgroundColor: "transparent",
  ...theme.typography.body1,
  width: "100%",
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface StatsTableProps {
  stats: { name: string; value: string }[];
}

const StatsTable = (props: StatsTableProps) => {
  return (
    <>
      <ListItem disablePadding>
        <Stack
          direction="row"
          sx={{ width: "100%" }}
          justifyContent="space-around ">
          {props.stats.map((stat, index) => (
            <Item key={index}>{stat.name}</Item>
          ))}
        </Stack>
      </ListItem>
      <Divider
        sx={{ bgcolor: "secondary.light" }}
      />
      <ListItem disablePadding>
        <Stack
          direction="row"
          sx={{ width: "100%" }}
          justifyContent="space-around ">
          {props.stats.map((stat, index) => (
            <Item key={index}>{stat.value}</Item>
          ))}
        </Stack>
      </ListItem>
    </>
  );
};

export default StatsTable;
