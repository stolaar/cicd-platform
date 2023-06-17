import { FC } from "react"
import { ICreatePipeline } from "./types"
import { useForm } from "react-hook-form"
import { FormTextField, FormDropdown } from "@form-fields"
import { useMutation, useQuery } from "@tanstack/react-query"
import { DataService } from "@services"
import { Dialog } from "@components/Dialog/Dialog"
import { ContainedButton } from "@components"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const pipelineSchema = z.object({
  name: z.string(),
  branch: z.string(),
  repository: z.string(),
})

type TPipelineValues = z.infer<typeof pipelineSchema>

export const CreatePipeline: FC<ICreatePipeline> = ({ open, onClose }) => {
  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(pipelineSchema),
  })

  const { data = [] } = useQuery({
    queryKey: DataService.getRepositories.queryKey(),
    queryFn: DataService.getRepositories(),
    enabled: open,
  })

  const createPipelineMutation = useMutation({
    mutationKey: DataService.createPipeline.queryKey,
    mutationFn: DataService.createPipeline,
  })

  const onCreateMutation = async (values: TPipelineValues) => {
    console.log("ON CREATE MUTAT")
    const provider = data.find(
      (item) => item.value === values.repository,
    )?.provider
    await createPipelineMutation.mutateAsync({ ...values, provider })
  }

  return (
    <form onSubmit={methods.handleSubmit(onCreateMutation, console.log)}>
      <Dialog
        title={"Create pipeline"}
        open={open}
        onClose={onClose}
        actions={<ContainedButton type={"submit"}>Save</ContainedButton>}
      >
        <FormTextField
          label={"Pipeline name"}
          name={"name"}
          control={methods.control}
        />
        <FormTextField
          helperText={"Set specific branch or a regex"}
          label={"Branch"}
          name={"branch"}
          control={methods.control}
        />
        <FormDropdown
          name={"repository"}
          control={methods.control}
          options={data}
          label={"Choose repository"}
        />
      </Dialog>
    </form>
  )
}
