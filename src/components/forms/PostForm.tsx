import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postValidationSchema } from "../../lib/validations";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import Loader from "../Loader";
import FileUploader from "./FileUploader";
import { useCreatPost } from "../../react-query/queries";
import { useEffect } from "react";
import { useCurrentUser } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "../ui/use-toast";

function PostForm() {
  const {
    mutateAsync: submitForm,
    isSuccess,
    isError,
    isPending: isSubmittingPost,
  } = useCreatPost();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast({ title: "Your post is live" });

      navigate("/");
    } else if (isError) {
      toast({ title: "Could not post at this time" });
    }
  }, [isSuccess, isError]);

  const { user } = useCurrentUser();

  const handleSubmit = (values: z.infer<typeof postValidationSchema>) => {
    submitForm({ ...values, userId: user.id });
  };

  const form = useForm<z.infer<typeof postValidationSchema>>({
    resolver: zodResolver(postValidationSchema),
    defaultValues: {
      caption: "",
      file: [],
      location: "",
      tags: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-9 w-full max-w-5xl mx-auto p-10"
      >
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea className="shad-input custom-scrollbar" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />

        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            onClick={() => {
              navigate("/");
            }}
            className="bg-light-4 flex gap-2"
          >
            <span>Cancel</span>
          </Button>

          <Button type="submit" className="bg-light-4 flex gap-2">
            {isSubmittingPost && <Loader />} <span>Post</span>
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PostForm;
