import { FC } from "react"
import { ContainedButton } from "@components"
import { CreatePipeline } from "@domain/pipelines/components/Pipelines/CreatePipeline"
import { useBoolean } from "@hooks"
import { useQuery } from "@tanstack/react-query"
import { DataService } from "@services"
import { Card } from "@mui/material"

export const Pipelines: FC = () => {
  const [
    isCreatePipeline,
    { setTrue: openCreatePipeline, setFalse: closeCreatePipeline },
  ] = useBoolean(false)

  const { data = [] } = useQuery({
    queryKey: DataService.getPipelines.queryKey(),
    queryFn: DataService.getPipelines,
  })

  return (
    <div>
      <ContainedButton onClick={openCreatePipeline}>
        Create pipeline
      </ContainedButton>
      <CreatePipeline onClose={closeCreatePipeline} open={isCreatePipeline} />
      {data.map((pipeline: any) => (
        <Card key={pipeline.name}>{pipeline.name}</Card>
      ))}
    </div>
  )
}
