import React, { FC, useMemo, useState } from "react"
import { ContainedButton, Text } from "@components"
import { CreateOrEditPipeline } from "@domain/pipelines/components/Pipelines/CreateOrEditPipeline"
import { useBoolean } from "@hooks"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataService } from "@services"
import { BaseGridRenderCellParams } from "@components/DataGrid"
import { Avatar, Box, Grid, IconButton } from "@mui/material"
import Link from "next/link"
import { PlayCircle, Delete, Edit } from "@mui/icons-material"
import { PipelineStatus } from "@domain/pipelines/components/Pipelines/components/PipelineStatus"
import { PipelineRow } from "@domain/pipelines/components/Pipelines/components/PipelineRow"
import { TPipeline } from "@domain/pipelines/components/Pipelines/validation/validation-schema"
import { GridColDef } from "@mui/x-data-grid"
import { StyledDataGrid } from "@domain/pipelines/components/Pipelines/Pipelines.styled"

export const Pipelines: FC = () => {
  const [
    isCreatePipeline,
    { setTrue: openCreatePipeline, setFalse: closeCreatePipeline },
  ] = useBoolean(false)

  const [selectedPipeline, setSelectedPipeline] = useState<TPipeline | null>(
    null,
  )

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

  const pipelineColumns: GridColDef[] = useMemo(
    () => [
      {
        field: "name",
        headerName: "Pipeline",
        renderCell: (row: BaseGridRenderCellParams) => (
          <Box>
            <Text variant={"subtitle2"}>{row.value}</Text>
            <Text variant={"body2"}>{row?.row?.repositoryName}</Text>
          </Box>
        ),
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
              <Box sx={{ display: "flex", gap: "5px", alignItems: "center" }}>
                {!!value.authorAvatarUrl && (
                  <Avatar
                    sx={{ height: 24, width: 24 }}
                    src={value.authorAvatarUrl}
                  />
                )}
                {value?.author}
              </Box>
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
        minWidth: 350,
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: (row: any) => (
          <Box>
            <IconButton color={"primary"} onClick={() => onRunPipeline(row.id)}>
              <PlayCircle />
            </IconButton>
            <IconButton
              onClick={() => setSelectedPipeline(row?.row as TPipeline)}
            >
              <Edit />
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
        width: 150,
      },
    ],
    [],
  )

  const onCloseCreateOrEditPipeline = () => {
    setSelectedPipeline(null)
    closeCreatePipeline()
  }

  return (
    <Grid container gap={1}>
      <Grid item md={12} textAlign={"right"}>
        <ContainedButton onClick={openCreatePipeline}>
          Create pipeline
        </ContainedButton>
      </Grid>
      {(isCreatePipeline || !!selectedPipeline) && (
        <CreateOrEditPipeline
          onClose={onCloseCreateOrEditPipeline}
          open={isCreatePipeline || !!selectedPipeline}
          pipeline={selectedPipeline ?? undefined}
        />
      )}
      <Grid item md={12} sx={{ overflowX: "auto" }}>
        <StyledDataGrid
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
