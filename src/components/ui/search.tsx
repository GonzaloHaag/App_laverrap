import { SearchIcon } from "lucide-react";
import { Input } from "./input";
import { useSearchParams } from "react-router-dom";

interface SearchProps {
  placeholder: string;
}

export const Search = ({ placeholder }: SearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    setSearchParams(params);
  };
  return (
    <div className="relative w-full max-w-xl">
      <Input
        autoFocus
        type="search"
        placeholder={placeholder}
        className="pl-8 w-full"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
      />
      <SearchIcon
        size={18}
        className="absolute top-0 bottom-0 my-auto mx-0 left-2 text-gray-300"
      />
    </div>
  );
};
