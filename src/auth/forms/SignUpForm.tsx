import { Button } from "../../components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "../../components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useSignUpAccount } from "../../react-query/queries";
import { signupSchema } from "../../lib/validations";

function SignUpForm() {
  const navigate = useNavigate();

  const { mutateAsync: createUserAccount, isPending } = useSignUpAccount();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  });

  async function handleSignup(values: z.infer<typeof signupSchema>) {
    let user;
    try {
      user = await createUserAccount(values);
      navigate("/sign-in");
    } catch (err) {
      console.log(err);
    } finally {
      if (!user) {
        toast({ title: "Sign up failed." });
      }
    }
  }

  const loading = isPending;

  return (
    <div className="flex  items-center justify-center mx-auto">
      <div>
        <h1 className="text-3xl font-semibold text-center">
          Create a new account
        </h1>
        <p className="mt-2 text-light-3">
          To use SocialApp, please enter your details
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignup)}
            className="flex flex-col gap-5 w-full mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Name</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Email</FormLabel>
                  <FormControl>
                    <Input type="text" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="shad-form_label">Password</FormLabel>
                  <FormControl>
                    <Input type="password" className="shad-input" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="bg-light-4 flex gap-2">
              {loading && <Loader />} <span>Submit</span>
            </Button>
          </form>
        </Form>

        <div className="mt-2 text-center">
          <p>
            Already have an account?
            <Link to={"/sign-in"} className="ml-1 text-light-3 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;
