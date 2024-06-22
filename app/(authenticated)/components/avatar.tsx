import { FunctionComponent } from "react";
import Image from "next/image";
import Typography from "@/components/ui/typography";

interface AvatarProps {}

const Avatar: FunctionComponent<AvatarProps> = () => {
  return (
    <div className="flex gap-3 items-center">
      <div className="md:flex max-w-48 flex-col justify-center items-start gap-1 hidden">
        <Typography variant='p' className="truncate w-full text-base">Marwan Abdul Rahman Sa-ad</Typography>
        <Typography variant='p' affects='muted' className="truncate w-full !mt-0 !leading-3">saadmarwan16@gmail.com</Typography>
      </div>
      <div className="relative w-12 aspect-square rounded-full">
        <Image
          src="/img/profile.jpg"
          alt="Logo"
          className="rounded-full"
          fill
        />
      </div>
    </div>
  );
};

export default Avatar;
