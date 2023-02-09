import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Link,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { Link as RouterLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { RecentTeam, RecentTeams } from "../../model/Dto/ResentTeams";
import ItemsList from "../../components/ItemsList";
import { useTranslation } from "react-i18next";
import { Api } from "../../request/api/api";

export default function ResentTeams() {
  const { t } = useTranslation();
  const [resentTeams, setResentTeams] = useState<RecentTeams>();

  useEffect(() => {
    Api.getResentTeams().then((result) => setResentTeams(result));
  }, []);

  return (
    <Container fixed>
      <Typography
        align="center"
        sx={{ fontWeight: "600" }}
        variant="h5"
        color="secondary"
        gutterBottom>
        {t("recentGangsTitle", { ns: ["home"] })}
      </Typography>
      {!resentTeams ? (
        <Stack
          sx={{ height: "400px" }}
          alignItems="center"
          justifyContent="center">
          <CircularProgress color="secondary" />
        </Stack>
      ) : (
        <>
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
              background:
                "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))",
            }}>
            <List sx={{ padding: 0 }}>
              <ItemsList
                items={resentTeams?.teams}
                renderItem={(item: RecentTeam, index: number) =>
                  gangPrewiew(index, item)
                }
              />
            </List>
          </Box>
        </>
      )}
    </Container>
  );
}

interface GridItemWithTypographyProps {
  xs: number;
  content: string;
  color: string;
}

const getDate = (date: Date): string => {
  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).valueOf();

  return date.toLocaleString(
    "ru-RU",
    date.valueOf() < today.valueOf()
      ? {
          year: "numeric",
          month: "numeric",
          day: "numeric",
        }
      : {
          hour: "numeric",
          minute: "numeric",
        }
  );
};

function gangPrewiew(index: number, item: RecentTeam) {
  const { t } = useTranslation();
  const date = new Date(item.lastEditTime * 1000);
  return (
    <Box key={index}>
      <ListItem>
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid sx={{ pt: "7px" }} item xs={8}>
            <Link
              color="secondary"
              component={RouterLink}
              to={`/roster/${item.id}`}>
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
            content={t("rating", {
              number: `${item.rating}`,
              ns: ["home"],
            })}
            color="white"
          />
          <GridItemWithTypography
            xs={4}
            content={getDate(date)}
            color="#645A59"
          />
        </Grid>
      </ListItem>
      <Divider color="black" />
    </Box>
  );
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
