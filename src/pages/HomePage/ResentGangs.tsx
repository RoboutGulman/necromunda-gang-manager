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
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecentTeam, RecentTeams } from "../../model/Dto/ResentTeams";
import resentTeamsJson from "../../model/FakeData/ResentTeams.json";
import { plainToClass } from "class-transformer";
import ItemsList from "../../components/ItemsList";
import { useTranslation } from "react-i18next";

export default function ResentGangs() {
  const { t } = useTranslation();
  const [resentTeams, setResentTeams] = useState<RecentTeams>();

  useEffect(() => {
    setResentTeams(plainToClass(RecentTeams, resentTeamsJson));
  }, []);

  return resentTeams === undefined ? (
    <></>
  ) : (
    <Container fixed>
      <Typography
        align="center"
        sx={{ fontWeight: "600" }}
        variant="h5"
        color="secondary"
        gutterBottom>
        {t("recentGangsTitle", { ns: ["home"] })}
      </Typography>
      <Typography align="center" variant="body1" color="white" gutterBottom>
        {t("recentGangsCounting", {
          number: `${resentTeams?.totalTeamsNumber}`,
          ns: ["home"],
        })}
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
          <ItemsList
            items={resentTeams?.teams}
            renderItem={(item: RecentTeam, index: number) => (
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
                        {item.creator.name}
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container sx={{ flexGrow: 1 }}>
                    <GridItemWithTypography
                      xs={5}
                      content={item.faction.name}
                      color="white"
                    />
                    <GridItemWithTypography
                      xs={3}
                      content={`Rating ${item.rating}`}
                      color="white"
                    />
                    <GridItemWithTypography
                      xs={4}
                      content={item.timeSinceLastEdit.toLocaleString()}
                      color="#645A59"
                    />
                  </Grid>
                </ListItem>
                <Divider color="black" />
              </Box>
            )}
          />
        </List>
      </Box>
    </Container>
  );
}

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
