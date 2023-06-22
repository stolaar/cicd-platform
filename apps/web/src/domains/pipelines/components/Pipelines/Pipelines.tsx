import React, { FC, useMemo } from "react"
import { ContainedButton, Text } from "@components"
import { CreatePipeline } from "@domain/pipelines/components/Pipelines/CreatePipeline"
import { useBoolean } from "@hooks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataService } from "@services"
import { BaseGridRenderCellParams, DataGrid } from "@components/DataGrid"
import { Box, Grid, IconButton } from "@mui/material"
import Link from "next/link"
import { PlayCircle, Delete } from "@mui/icons-material"
import { PipelineStatus } from "@domain/pipelines/components/Pipelines/components/PipelineStatus"
import { PipelineRow } from "@domain/pipelines/components/Pipelines/components/PipelineRow"

export const Pipelines: FC = () => {
  const [
    isCreatePipeline,
    { setTrue: openCreatePipeline, setFalse: closeCreatePipeline },
  ] = useBoolean(false)

  const queryClient = useQueryClient()

  const { data = [], isLoading } = useQuery({
    queryKey: DataService.getPipelines.queryKey(),
    queryFn: DataService.getPipelines,
  })

  const runPipelineMutation = useMutation({
    mutationFn: DataService.runPipeline,
    mutationKey: DataService.runPipeline.queryKey,
    onSuccess: () =>
      queryClient.invalidateQueries(DataService.getPipelines.queryKey()),
  })

  const deletePipelineMutation = useMutation({
    mutationFn: DataService.deletePipeline,
    mutationKey: DataService.deletePipeline.queryKey,
    onSuccess: () =>
      queryClient.invalidateQueries(DataService.getPipelines.queryKey()),
  })

  const onRunPipeline = (id: number) => {
    runPipelineMutation.mutate(id)
  }

  const onDeletePipeline = (id: number) => {
    deletePipelineMutation.mutate(id)
  }

  const pipelineColumns = useMemo(
    () => [
      {
        field: "name",
        headerName: "Pipeline",
        renderCell: (row: BaseGridRenderCellParams) => <Text>{row.value}</Text>,
        sortable: false,
        width: 281,
      },
      {
        field: "status",
        headerName: "Status",
        renderCell: (row: any) => (
          <PipelineStatus
            id={row?.row?.lastJob?.id}
            status={row?.row?.lastJob?.status ?? "pending"}
          />
        ),
        sortable: false,
        width: 281,
      },
      {
        field: "lastJob",
        headerName: "Commit",
        renderCell: ({ value }: any) =>
          !!value && (
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box>{value?.commitMessage}</Box>
              <Box>{value?.author}</Box>
              <Box>
                {`${value?.branch} `}
                {!!value?.commitLink && (
                  <Link
                    href={value?.commitLink}
                  >{`(${value?.commitSha})`}</Link>
                )}
              </Box>
            </Box>
          ),
        sortable: false,
        flex: 1,
        minWidth: 481,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: (row: any) => (
          <Box>
            <IconButton onClick={() => onRunPipeline(row.id)}>
              <PlayCircle />
            </IconButton>
            <IconButton
              color={"error"}
              onClick={() => onDeletePipeline(row.id)}
            >
              <Delete />
            </IconButton>
          </Box>
        ),
        sortable: false,
        maxWidth: 100,
      },
    ],
    [],
  )

  return (
    <Grid container gap={1}>
      <Grid item md={12} textAlign={"right"}>
        <ContainedButton onClick={openCreatePipeline}>
          Create pipeline
        </ContainedButton>
      </Grid>
      <CreatePipeline onClose={closeCreatePipeline} open={isCreatePipeline} />
      <Grid item md={12} sx={{ overflowX: "auto" }}>
        <DataGrid
          slots={{
            row: PipelineRow,
          }}
          density="compact"
          autoHeight
          columns={pipelineColumns}
          rows={data}
          getRowId={(row) => row.id}
          loading={isLoading}
          sortingMode="server"
          rowCount={data?.length ?? 0}
        />
      </Grid>
    </Grid>
  )
}
