import { FC } from "react"
import { IPipelineCard } from "./types"
import { StyledContainer } from "./PipelineCard.styled"
import { Box } from "@mui/material"
import Link from "next/link"

export const PipelineCard: FC<IPipelineCard> = ({
  id,
  name,
  status,
  lastCommit,
}) => {
  return (
    <StyledContainer>
      <Box>
        <Link href={`/pipelines/${id}`}>{name}</Link>
      </Box>
      <Box>{status}</Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box>{lastCommit?.message}</Box>
        <Box>{lastCommit?.author}</Box>
        <Box>
          {lastCommit?.branch}
          <Link href={lastCommit.link}>{`(${lastCommit.sha})`}</Link>
        </Box>
      </Box>
    </StyledContainer>
  )
}
