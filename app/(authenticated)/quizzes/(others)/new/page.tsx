import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Typography from "@/components/ui/typography";
import { FunctionComponent } from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface NewQuizProps {}

const NewQuiz: FunctionComponent<NewQuizProps> = () => {
  return (
    <form className="flex flex-col gap-9">
      <Typography variant="h3">Add New Quiz</Typography>
      <div className="flex flex-col-reverse md:flex-row gap-6 md:gap-10 lg:gap-12 grow md:items-start">
        <div className="flex flex-col justify-center items-center gap-6 md:grow lg:max-w-[600px]">
          <div className="w-full">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter the name of the book here..."
            />
            <Label
              htmlFor="name"
              className="text-sm font-light text-destructive"
            >
              Book name must contain at least 2 characters
            </Label>
          </div>
          <div className="w-full">
            <Label htmlFor="author">Author</Label>
            <Input
              type="text"
              id="author"
              placeholder="Enter the name of the author here..."
            />
            <Label
              htmlFor="author"
              className="text-sm font-light text-destructive"
            >
              Author name must contain at least 2 characters
            </Label>
          </div>
        </div>

        {/* <div className="flex flex-col gap-4 max-w-52 md:grow">
          <AspectRatio ratio={9 / 16} className="bg-muted">
            <Image
              src="/img/rich_dad_poor_dad.jpg"
              alt="Rich Dad Poor Dad book cover"
              fill
              className="rounded-md object-cover"
            />
          </AspectRatio>
          <Button type="button" variant='outline'>Update Cover</Button>
        </div> */}

        <div className="md:grow max-w-[600px]">
          <Label htmlFor="image">Cover</Label>
          <Input id="image" type="file" />
          <Label
            htmlFor="image"
            className="text-sm font-light text-destructive"
          >
            Quiz cover cannot be null
          </Label>
        </div>
      </div>
      <Button type="submit" className="md:max-w-[400px] lg:max-w-[600px]">Add Quiz</Button>
    </form>
  );
};

export default NewQuiz;
