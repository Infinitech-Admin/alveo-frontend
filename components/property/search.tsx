import { Input } from "@heroui/react";
import React from "react";

import { SearchIcon } from "../icons";

const SearchItem = ({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: any;
}) => {
  return (
    <div className="max-w-xl flex gap-2 mx-auto">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        placeholder="Search Property..."
        startContent={
          <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
        }
        type="search"
        value={filters.search || ""}
        onChange={(e) =>
          setFilters((prev: any) => ({ ...prev, search: e.target.value }))
        }
      />
    </div>
  );
};

export default SearchItem;
