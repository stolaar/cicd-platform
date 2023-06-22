import { FC, useEffect } from "react"
import { ICreateOrEditPipeline } from "./types"
import { useForm } from "react-hook-form"
import { FormTextField, FormDropdown } from "@form-fields"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { DataService } from "@services"
import { Dialog } from "@components/Dialog/Dialog"
import { ContainedButton } from "@components"
import { zodResolver } from "@hookform/resolvers/zod"
import { pipelineSchema, TPipeline } from "./validation/validation-schema"

export const CreateOrEditPipeline: FC<ICreateOrEditPipeline> = ({
  open,
  onClose,
  pipeline,
}) => {
  const queryClient = useQueryClient()

  const { data = [] } = useQuery({
    queryKey: DataService.getRepositories.queryKey(),
    queryFn: DataService.getRepositories(),
    enabled: open,
    retry: false,
    meta: {
      type: "getRepositories",
    },
  })

  const methods = useForm<TPipeline>({
    mode: "onChange",
    resolver: zodResolver(pipelineSchema),
    defaultValues: {
      name: pipeline?.name,
      branch: pipeline?.branch,
    },
  })

  const createPipelineMutation = useMutation({
    mutationKey: DataService.createPipeline.queryKey,
    mutationFn: DataService.createPipeline,
    onSuccess: () => {
      onClose()
      return queryClient.invalidateQueries(DataService.getPipelines.queryKey())
    },
  })

  const editPipelineMutation = useMutation({
    mutationKey: DataService.editPipeline.queryKey,
    mutationFn: DataService.editPipeline,
    onSuccess: () => {
      onClose()
      return queryClient.invalidateQueries(DataService.getPipelines.queryKey())
    },
  })

  const onCreateOrEditMutation = async (values: TPipeline) => {
    const provider = data.find((item) => item.value === values.repositoryId)

    if (pipeline?.id) {
      await editPipelineMutation.mutateAsync({
        ...values,
        provider: provider?.provider,
        repositoryName: provider?.fullName,
        id: pipeline.id,
      })
      return
    }

    await createPipelineMutation.mutateAsync({
      ...values,
      provider: provider?.provider,
      repositoryName: provider?.fullName,
    })
  }

  const onCloseHandler = () => {
    methods.reset()
    onClose()
  }

  useEffect(() => {
    if (pipeline && data.length) {
      methods.setValue("repositoryId", pipeline.repositoryId)
    }
  }, [pipeline, data])

  return (
    <form onSubmit={methods.handleSubmit(onCreateOrEditMutation)}>
      <Dialog
        title={`${pipeline?.id ? "Edit" : "Create"} pipeline`}
        open={open}
        onClose={onCloseHandler}
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
          name={"repositoryId"}
          control={methods.control}
          options={data}
          label={"Choose repository"}
        />
      </Dialog>
    </form>
  )
}
