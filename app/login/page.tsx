import { FunctionComponent } from "react";
import { Header } from "./components";
import Typography from "@/components/ui/typography";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  return (
    <main className="flex min-h-screen flex-col gap-7 sm:gap-10">
      <Header />

      <section className="flex flex-col grow justify-center items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-5 sm:px-8 md:px-12 lg:px-16 pb-5 sm:pb-8 md:pb-12 lg:pb-16">
        <div className="flex flex-col items-center gap-2.5 max-w-[450px] text-center">
          <Typography variant="h2">Login to Your Admin Account</Typography>
          <Typography variant="h4" affects="muted" className="font-medium">
            Generate quizzes for all books genres that can be found in the
            public domain.
          </Typography>
        </div>

        <form className="max-w-[450px] w-full flex flex-col justify-center items-center gap-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email address here..."
            />
            <Label
              htmlFor="email"
              className="text-destructive font-light text-sm"
            >
              Invalid email address
            </Label>
          </div>
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password here..."
            />
            <Label
              htmlFor="password"
              className="text-destructive font-light text-sm"
            >
              Invalid password
            </Label>
          </div>

          <Button className="w-full">Login</Button>
        </form>
      </section>
    </main>
  );
};

export default Login;
