import { StyledContainer } from "./UsersManager.styled";
import { CreateUserForm } from "@domain/users/forms";
import { ListUsers } from "@domain/users/components/ListUsers/ListUsers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DataService } from "@services";

export const UsersManager = () => {
  const queryClient = useQueryClient();
  const createUserMutation = useMutation({
    mutationFn: DataService.createUser,
    mutationKey: DataService.createUser.queryKey,
    onSuccess: () => {
      queryClient.invalidateQueries(DataService.getUsers.queryKey);
    },
  });

  const onCreateUser = async (data: unknown) => {
    try {
      await createUserMutation.mutateAsync(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <StyledContainer>
      <CreateUserForm onSubmit={onCreateUser} />
      <ListUsers />
    </StyledContainer>
  );
};
