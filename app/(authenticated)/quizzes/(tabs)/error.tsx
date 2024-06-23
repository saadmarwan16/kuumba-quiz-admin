"use client";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";
import { FunctionComponent, useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const Error: FunctionComponent<ErrorProps> = ({ error, reset }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <section className="flex flex-col items-center gap-2 py-24 sm:py-28  md:py-32 text-center">
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="h3">Something went wrong.</Typography>
      <Typography variant="p" affects="removePMargin">
        Error 500. Internal Server Error
      </Typography>
      <Button onClick={reset}>Try again</Button>
    </section>
  );
};

export default Error;
