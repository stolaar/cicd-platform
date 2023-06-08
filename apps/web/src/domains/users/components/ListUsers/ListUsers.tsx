import { useQuery } from "@tanstack/react-query";
import { DataService } from "@services";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { StyledWrapper } from "./ListUsers.styled";
import { Text } from "@components";
import { LABELS } from "./utils";
import { Person } from "@mui/icons-material";

export const ListUsers = () => {
  const { data } = useQuery(
    DataService.getUsers.queryKey,
    DataService.getUsers
  );
  return (
    <StyledWrapper>
      <Text variant={"h5"}>{LABELS.users}</Text>
      <Box>
        <List>
          {data?.map(({ name, id }) => (
            <ListItem key={id}>
              <ListItemAvatar>
                <Avatar>
                  <Person />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} secondary={id} />
            </ListItem>
          ))}
        </List>
      </Box>
    </StyledWrapper>
  );
};
