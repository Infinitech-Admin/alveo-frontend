'use client'
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import EmptyData from "@/components/fallback/emptydata";

interface Unit {
  type: string;
  area: number;
  price: string;
  status: string;
}

interface Property {
  units: Unit[];
}

interface UnitSectionProps {
  data: Property; // Property type now includes units
}

const UnitSection: React.FC<UnitSectionProps> = ({ data }) => {
  return (
    <section className="w-full flex flex-col justify-center py-12 mt-0">
      <div>
        <h1 className="font-bold text-2xl uppercase">Units</h1>
        <p className="text-sm text-default-500 max-w-md">
          Can&apos;t find the unit you want? Leave us your info and be the first
          to know when one becomes available!
        </p>
      </div>
      <div className="py-6">
        {data.units.length > 0 ? (
          <Table aria-label="Unit collection table">
            <TableHeader>
              <TableColumn>Unit/PS Type</TableColumn>
              <TableColumn>Gross Floor Area</TableColumn>
              <TableColumn>Price Range</TableColumn>
              <TableColumn>Availability</TableColumn>
            </TableHeader>
            <TableBody>
              {data.units.map((unit, index) => (
                <TableRow key={index}>
                  <TableCell>{unit.type}</TableCell>
                  <TableCell>
                    {unit.area ? `${unit.area} Sqm.` : "Not Available"}
                  </TableCell>
                  <TableCell>
                    {unit.price
                      ? unit.price
                          .split(" - ")
                          .map(
                            (price) =>
                              `₱${new Intl.NumberFormat("en-PH").format(parseFloat(price))}`
                          )
                          .join(" - ")
                      : "Not Available"}
                  </TableCell>
                  <TableCell>
                    <div
                      className={`text-tiny uppercase font-semibold px-2 py-1 rounded-md mb-2 inline-flex items-center gap-1 ${
                        unit.status === "Few Units Left"
                          ? "bg-green-100 text-green-800"
                          : unit.status === "Not Available"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {unit.status}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <EmptyData fallbackname={"Units"}/>
        )}
      </div>
    </section>
  );
};

export default UnitSection;
