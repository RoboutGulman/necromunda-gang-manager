import { Box, Divider, Grid, List, ListItem, Typography } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import background from "../../backgrounds/dark_texture_bg.jpg";

type Props = {};

type RosterView = {
  name: string;
  faction: string;
  rating: number;
  creatorNickname: string;
  time: string;
};

const Roster: RosterView[] = [
  {
    name: "Windraiders",
    faction: "Ash Waste Nomads",
    rating: 0,
    creatorNickname: "serrath",
    time: "2 seconds",
  },
  {
    name: "Belowed of the 4-armed Emperor",
    faction: "Genestealer Cult",
    rating: 145,
    creatorNickname: "Antihero",
    time: "3 minutes",
  },
  {
    name: "HPED-v2",
    faction: "Enforcers",
    rating: 710,
    creatorNickname: "Omenos",
    time: "6 minutes",
  },
];
//backgroundImage: `url('${background}')`,
function ResentGangs({}: Props) {
  return (
    <Box
      sx={{
        border: "solid",
        width: "100%",
        maxWidth: 500,
        background: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))",
      }}
    >
      <List sx={{ padding: 0 }}>
        {Roster.map((item: RosterView, index: number) => (
          <Box key={index}>
            <ListItem>
              <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" color="secondary">
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item xs={1}>
                  <AccountBoxIcon color="secondary" />
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1" color="secondary">
                    {item.creatorNickname}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" color="white">
                    {item.faction}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1" color="white">
                    Rating {item.rating}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="#645A59">
                    {item.time}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider color="black" />
          </Box>
        ))}
      </List>
    </Box>
  );
}
/*<Typography
              variant="h6"
              color = "secondary"
              sx={{
                flexGrow: 1,
              }}
            >
              {item.creatorNickname}
            </Typography>*/
//<ListItemText color="secondary">{item.creatorNickname}</ListItemText>
export default ResentGangs;
