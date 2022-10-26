import {
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

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
    time: "2seconds",
  },
  {
    name: "Belowed of the 4-armed Emperor",
    faction: "Genestealer Cult",
    rating: 145,
    creatorNickname: "Antihero",
    time: "3minutes",
  },
  {
    name: "HPED-v2",
    faction: "Enforcers",
    rating: 710,
    creatorNickname: "Omenos",
    time: "6minutes",
  },
];

function ResentGangs({}: Props) {
  return (
    <Box
      sx={{
        border: "solid",
        width: "100%",
        maxWidth: 500,
        bgcolor: "background.transparent",
      }}
    >
      <List>
        {Roster.map((item: RosterView, index: number) => (
          <Box key={index}>
            <ListItem>
              <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={8}>
                  <Typography variant="subtitle1" color="secondary">
                    {item.name}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <List
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      padding: 0,
                    }}
                  >
                    <ListItem>
                      <AccountBoxIcon color="secondary" />
                    </ListItem>
                    <ListItem>
                      <Typography variant="subtitle1" color="secondary">
                        {item.creatorNickname}
                      </Typography>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container sx={{ flexGrow: 1 }}>
                <Grid item xs={5}>
                  <Typography variant="subtitle1" color="#D1C1BE">
                    {item.faction}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography variant="subtitle1" color="#D1C1BE">
                    Rating {item.rating}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="#D1C1BE">
                    {item.time}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
            <Divider color = "primary" />
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
