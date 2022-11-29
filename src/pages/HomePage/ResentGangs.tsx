import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { TeamPreview } from "../../model/Types";
import { TeamPreviewExamples } from "../../model/FakeData/FakeData";
import { Link as RouterLink } from "react-router-dom";

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

function ResentGangs() {
  return (
    <Container fixed>
      <Typography
        align="center"
        sx={{ fontWeight: "600" }}
        variant="h5"
        color="secondary"
        gutterBottom>
        RECENT COMMUNITY GANGS
      </Typography>
      <Typography align="center" variant="body1" color="white" gutterBottom>
        3 gangs and counting...
      </Typography>
      <Box
        sx={{
          margin: "auto",
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
                  <Grid sx={{ pt: "7px" }} item xs={8}>
                    <Link
                      color="secondary"
                      component={RouterLink}
                      to="/roster/1">
                      {item.name}
                    </Link>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      variant="text"
                      color="secondary"
                      startIcon={<AccountBoxIcon />}>
                      {item.creatorNickname}
                    </Button>
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
    </Container>
  );
}
export default ResentGangs;
