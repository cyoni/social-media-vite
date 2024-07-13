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
import { useCurrentUser } from "../../context/AuthContext";
import { useSignInAccount } from "../../react-query/queries";
import { signinSchema } from "../../lib/validations";

function SignInForm() {
  const navigate = useNavigate();

  const { isLoading: isSigningIn, checkAuthUser } = useCurrentUser();

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutateAsync: signInAccount, isPending } = useSignInAccount();

  async function handleSignin(values: z.infer<typeof signinSchema>) {
    try {
      const session = await signInAccount(values);
      if (!session) {
        return toast({ title: "Sign-in failed." });
      }

      const user = await checkAuthUser();
      if (!user) {
        return toast({ title: "Sign-in failed." });
      }

      navigate("/", { replace: true });

      form.reset();
    } catch (err) {
      return toast({ title: "Sign-in failed." });
    }
  }

  const loading = isSigningIn || isPending;

  return (
    <div className="flex items-center justify-center mx-auto">
      <div>
        <h1 className="text-3xl font-semibold text-center">Sign in </h1>
        <p className="mt-2 text-light-3">
          To use SocialApp, please enter your details
        </p>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSignin)}
            className="flex flex-col gap-5 w-full mt-4"
          >
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
              {loading && <Loader />} <span>Sign In</span>
            </Button>
          </form>
        </Form>

        <div className="mt-2 text-center">
          <p>
            Don't have an account?
            <Link to={"/sign-up"} className="ml-1 text-light-3 font-semibold">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
