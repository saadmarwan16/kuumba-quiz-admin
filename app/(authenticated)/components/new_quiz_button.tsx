import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { FunctionComponent } from "react";
import { IoMdAdd } from "react-icons/io";

interface NewQuizButtonProps {
  small?: boolean;
}

const NewQuizButton: FunctionComponent<NewQuizButtonProps> = ({
  small = false,
}) => {
  return (
    <>
      {small ? (
        <Link
          href="/quizzes/new"
          className={`${buttonVariants()} self-stretch md:hidden mt-0 sm:mt-16`}
        >
          <IoMdAdd className="mr-2 h-6 w-6" />
          Add New Quiz
        </Link>
      ) : (
        <Link
          href="/quizzes/new"
          className={`${buttonVariants()} hidden md:inline-flex`}
        >
          <IoMdAdd className="mr-2 h-6 w-6" />
          Add New Quiz
        </Link>
      )}
    </>
  );
};

export default NewQuizButton;
