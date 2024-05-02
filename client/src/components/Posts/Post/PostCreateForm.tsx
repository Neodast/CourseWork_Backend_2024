import InputField from '@/components/Base/Inputs/InputField';
import FormValidationError from '@/components/Forms/RegistrationForm/Errors/FormValidationError';
import PostService from '@/services/PostService';
import { useUserStore } from '@/stores/UserStore';
import IPostInput from '@/types/board/posts/IPostInput';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

export default function PostCreateForm() {
  const author = useUserStore((state) => state.user);
  const queryClient = useQueryClient();

  if (!author) {
    throw new Error('User is unauthorize');
  }
  Object.assign({ author }, { isVerify: true });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<IPostInput>({
    defaultValues: { sectionTitle: 't1' },
  });

  const mutation = useMutation({
    mutationKey: ['posts'],
    mutationFn: PostService.createPost, 
    onSuccess: async () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const submit: SubmitHandler<IPostInput> = async (data) => {
    await mutation.mutateAsync({ author: author, comments: [], ...data });
  };
  return (
    <div className="flex-1 items-center justify-center m-8">
      <form
        className="w-96 mx-auto font-roboto"
        onSubmit={handleSubmit(submit)}
      >
        <InputField
          label=""
          placeholder="Title"
          type="text"
          {...register('title')}
        ></InputField>
        <FormValidationError
          message={errors.title?.message}
        ></FormValidationError>
        <Controller
          control={control}
          {...register('text')}
          defaultValue=""
          render={({ field }) => <TextArea {...field} placeholder="Text" autoSize={{minRows: 4, maxRows: 16}}/>}
        />
        <FormValidationError
          message={errors.text?.message}
        ></FormValidationError>
        <Button
          size="large"
          shape="default"
          type="primary"
          htmlType="submit"
          formAction="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline-blue w-[100%]"
        >
          Create
        </Button>
      </form>
    </div>
  );
}