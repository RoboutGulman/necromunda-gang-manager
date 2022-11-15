import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link } from "react-router-dom";
import { TeamPreview } from "../../model/Types";
import { TeamPreviewExamples } from "../../model/FakeData";

interface GridItemWithTypographyProps {
  xs: number;
  content: string;
  color: string;
}

function GridItemWithTypography(props: GridItemWithTypographyProps) {
  return (
    <Grid item xs={props.xs}>
      <Typography variant="subtitle1" color={props.color}>
        {props.content}
      </Typography>
    </Grid>
  );
}
/*
 <AccountBoxIcon color="secondary" />
                  <Typography variant="subtitle1" color="secondary">
                    {item.creatorNickname}
                  </Typography>
<GridItemWithTypography
                  xs={3}
                  content={item.creatorNickname}
                  color="secondary"
                />
*/

function ResentGangs() {
  return (
    <Box
      sx={{
        border: "solid",
        width: "100%",
        maxWidth: 500,
        background: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
      }}>
      <List sx={{ padding: 0 }}>
        {TeamPreviewExamples.map((item: TeamPreview, index: number) => (
          <Box key={index}>
            <ListItem>
              <Grid container sx={{ flexGrow: 1 }}>
                <GridItemWithTypography
                  xs={8}
                  content={item.name}
                  color="secondary"
                />
                <Grid item xs={4}>
                  <Link to="/roster">
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<AccountBoxIcon />}>
                      {item.creatorNickname}
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem>
              <Grid container sx={{ flexGrow: 1 }}>
                <GridItemWithTypography
                  xs={5}
                  content={item.faction}
                  color="white"
                />
                <GridItemWithTypography
                  xs={3}
                  content={`Rating ${item.rating}`}
                  color="white"
                />
                <GridItemWithTypography
                  xs={4}
                  content={item.time}
                  color="#645A59"
                />
              </Grid>
            </ListItem>
            <Divider color="black" />
          </Box>
        ))}
      </List>
    </Box>
  );
}
export default ResentGangs;
