import { FC } from "react";
import { IAppLayout } from "./types";
import { StyledAppWrapper } from "./AppLayout.styled";
import { SideBar } from "@components/SideBar";
import { Box, CssBaseline } from "@mui/material";

export const AppLayout: FC<IAppLayout> = ({ children }) => {
  return (
    <StyledAppWrapper>
      <CssBaseline />
      <SideBar />
      <Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
        {children}
      </Box>
    </StyledAppWrapper>
  );
};
