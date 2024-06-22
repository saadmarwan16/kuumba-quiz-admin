import { Input } from "@/components/ui/input";
import { FunctionComponent } from "react";

interface SearchProps {
  small?: boolean;
}

const Search: FunctionComponent<SearchProps> = ({ small = false }) => {
  return (
    <>
      {small ? (
        <form className="px-5 sm:hidden mt-24 sm:mt-0">
          <Input type="text" placeholder="Search for a book here..." />
        </form>
      ) : (
        <form className="hidden sm:block grow max-w-[600px]">
          <Input type="text" placeholder="Search for a book here..." />
        </form>
      )}
    </>
  );
};

export default Search;
