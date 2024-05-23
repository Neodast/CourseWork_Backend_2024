import PostService from '@/services/PostService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const usePostEdit = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['editPost'],
    mutationFn: PostService.editPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['posts'] });
      await queryClient.invalidateQueries({ queryKey: ['post'] });
    },
  });
};

export default usePostEdit;
