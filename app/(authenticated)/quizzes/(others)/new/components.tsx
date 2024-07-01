import { FunctionComponent, useState } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { typeToFlattenedError } from "zod";
import { TInsertQuiz } from "@/lib/types/quiz";
import { useFormStatus } from "react-dom";

interface UploadImageProps {
  state?: {
    validationError?: typeToFlattenedError<TInsertQuiz>;
    serverError?: string;
  };
}

export const UploadImage: FunctionComponent<UploadImageProps> = ({ state }) => {
  const [image, setImage] = useState<string | null>(null);

  return (
    <>
      {image ? (
        <div className="flex flex-col gap-4 max-w-52 md:grow">
          <AspectRatio ratio={9 / 16} className="bg-muted">
            <Image
              src={image}
              alt="cover of the book to be inserted"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
          <Input
            id="cover"
            name="cover"
            type="file"
            className="hidden"
            onChange={(event) => {
              if (event.target.files && event.target.files.length > 0)
                setImage(URL.createObjectURL(event.target.files[0]));
            }}
          />
          <label
            htmlFor="cover"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Update Cover
          </label>
        </div>
      ) : (
        <div className="md:grow max-w-[600px]">
          <Label htmlFor="cover">Cover</Label>
          <Input
            id="cover"
            name="cover"
            type="file"
            onChange={(event) => {
              if (event.target.files && event.target.files.length > 0)
                setImage(URL.createObjectURL(event.target.files[0]));
            }}
          />
          {state?.validationError?.fieldErrors.cover?.map((error, idx) => (
            <Label
              key={idx}
              htmlFor="cover"
              className="text-sm font-light text-destructive"
            >
              {error}
            </Label>
          ))}
        </div>
      )}
    </>
  );
};

const InsertQuizButton: FunctionComponent = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      className="md:max-w-[400px] lg:max-w-[600px]"
    >
      Add Quiz
    </Button>
  );
};

export default InsertQuizButton;
