import { FC } from "react"
import { ContainedButton } from "@components"
import { CreatePipeline } from "@domain/pipelines/components/Pipelines/CreatePipeline"
import { useBoolean } from "@hooks"
import { useMutation, useQuery } from "@tanstack/react-query"
import { DataService } from "@services"
import { Card, CardActions, CardContent, CardHeader } from "@mui/material"
import { PipelineCard } from "@domain/pipelines/components/Pipelines/components/PipelineCard"

export const Pipelines: FC = () => {
  const [
    isCreatePipeline,
    { setTrue: openCreatePipeline, setFalse: closeCreatePipeline },
  ] = useBoolean(false)

  const { data = [] } = useQuery({
    queryKey: DataService.getPipelines.queryKey(),
    queryFn: DataService.getPipelines,
  })

  const runPipelineMutation = useMutation({
    mutationFn: DataService.runPipeline,
    mutationKey: DataService.runPipeline.queryKey,
  })

  const onRunPipeline = (id: number) => {
    runPipelineMutation.mutate(id)
  }

  return (
    <div>
      <ContainedButton onClick={openCreatePipeline}>
        Create pipeline
      </ContainedButton>
      <CreatePipeline onClose={closeCreatePipeline} open={isCreatePipeline} />
      {data.map((pipeline: any) => (
        <PipelineCard
          key={pipeline.name}
          {...pipeline}
          status={pipeline.lastJob.status}
          lastCommit={{
            ...pipeline.lastJob,
            sha: pipeline.lastJob.commitSha,
            link: pipeline.lastJob.commitLink,
          }}
        />
      ))}
    </div>
  )
}
