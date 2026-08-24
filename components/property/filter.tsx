"use client";
import React from "react";
import { Input } from "@heroui/input";

import { SearchIcon } from "../icons";

const PropertyFilter = ({
  filters,
  setFilters,
}: {
  filters: any;
  setFilters: any;
}) => {
  return (
    <div className="max-w-sm w-full flex gap-4">
      <Input
        aria-label="Search by Name or Location"
        classNames={{
          inputWrapper: "bg-default-100",
          input: "text-sm",
        }}
        labelPlacement="outside"
        placeholder="Search by Name or Location..."
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

export default PropertyFilter;
