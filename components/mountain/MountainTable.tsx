"use client";

/*
 * MountainTable.tsx
 * Table to display mountain data
 */

import {
  useTable,
  tableFeatures,
  FlexRender,
  createSortedRowModel,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_text,
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

import type {
  Mountain,
  PriceInterface,
} from "@/types/MountainTypes";

import DifficultyBar from "@/components/mountain/DifficultyBar";

interface MountainTableProps {
  mountains: Mountain[];
}

/*
* color coding for pass access col
*/
const renderPassAccess = (passName: string) => {
  const baseClass =
    "inline-flex items-center rounded-full px-2 py-0.5 my-0.5 ";

  if (passName === "Epic") {
    return <p key={passName} className={`${baseClass} bg-orange-400`}>{passName}</p>
  } else if (passName === "Indy") {
    return <p key={passName} className={`${baseClass} bg-red-500`}>{passName}</p>
  } else if (passName === "Ikon") {
    return <p key={passName} className={`${baseClass} bg-blue-500/95`}>{passName}</p>
  } else if (passName === "Nitro") {
    return <p key={passName} className={`${baseClass} bg-yellow-300`}>{passName}</p>
  } else {
    return <p key={passName} className={`${baseClass} bg-gray-300`}>{passName}</p>
  }
}

const renderLiftTicketPrices = (pricing: PriceInterface) => {
  if (
    pricing.liftTicketWeekday === undefined &&
    pricing.liftTicketWeekend === undefined
  ) {
    return <p>No lift ticket estimates available</p>;
  }

  return (
    <div>
      {pricing.liftTicketWeekday !== undefined && (
        <p className="my-0.5">Weekday estimate: ${pricing.liftTicketWeekday}</p>
      )}

      {pricing.liftTicketWeekend !== undefined && (
        <p className="my-0.5">Weekend estimate: ${pricing.liftTicketWeekend}</p>
      )}
    </div>
  );
}

const features = tableFeatures({
  rowSortingFeature, // enables sorting APIs and state
  sortedRowModel: createSortedRowModel(), // client-side sorting
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
  },
});

const getLowestLiftTicketPrice = (prices: PriceInterface) => {
  const priceOptions = [
    prices.liftTicketWeekday,
    prices.liftTicketWeekend,
  ].filter((price): price is number => price !== undefined);

  return priceOptions.length > 0 ? Math.min(...priceOptions) : undefined;
};

const columns: Array<ColumnDef<typeof features, Mountain>> = [
  {
    accessorKey: 'name',
    header: 'Mountain/Resort',
    sortFn: "alphanumeric",
    sortDescFirst: false,
  },
  {
    accessorKey: 'state',
    header: 'State/Location',
    sortFn: "text",
    sortDescFirst: false,
  },
  //   header: 'Drive Time',
  //   cell: () => "-Drive time",
  //   sortFn: "basic",
  // },
  {
    accessorKey: 'trails',
    header: 'Trail Difficulty Distribution',
    cell: (info) => {
      const mountain = info.row.original;
      return (
        <DifficultyBar trails={mountain.trails} />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'verticalDrop',
    header: 'Vertical Drop (ft)',
    // sortFn: "basic",
    sortDescFirst: false,
  },
  {
    accessorKey: 'pricing',
    header: 'Estimated Adult Lift Ticket Price (avg, in USD)',
    cell: (info) => {
      const mountain = info.row.original;
      return renderLiftTicketPrices(mountain.pricing);
    },
    // get lowest available lift ticket price
    sortFn: (rowA, rowB) => {
      const priceA = getLowestLiftTicketPrice(rowA.original.pricing);
      const priceB = getLowestLiftTicketPrice(rowB.original.pricing);

      return (priceA ?? Infinity) - (priceB ?? Infinity);
    },
    sortDescFirst: false,
  },
  {
    accessorKey: 'passes',
    header: 'Pass Access',
    cell: (info) => {
      const mountain = info.row.original;
      return (
        <div className="flex flex-wrap gap-1">
          {mountain.passes.map((pass) =>
            renderPassAccess(pass.passName)
          )}
        </div>
      );
    },
    sortFn: (rowA, rowB) => {
      const optionsA = rowA.original.passes
        .map(pass => pass.passName)
        .sort();
      const optionsB = rowB.original.passes
        .map(pass => pass.passName)
        .sort();

      const passA = optionsA[0];
      const passB = optionsB[0];

      if (passA === undefined && passB === undefined) return 0;
      if (passA === undefined) return 1;
      if (passB === undefined) return -1;

      return passA.localeCompare(passB);
    },
    sortDescFirst: false,
  },
  // {
  //   accessorKey: 'snowfall',
  //   header: 'Snowfall',
  //   cell: () => "-Snowfall",
  // },
  // {
  //   accessorKey: 'weather',
  //   header: 'OpenWeather',
  //   cell: () => "-Weather",
  // },
]

export default function MountainTable({
    mountains,
}: MountainTableProps) {
  const table = useTable({
    key: 'mountains-table', // needed for devtools
    features,
    columns,
    data: mountains
  })
  return (
    <div className="overflow-x-auto rounded-lg border my-3">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : (
                      <div
                        className="flex items-center justify-center gap-1"
                        style={{
                          cursor: header.column.getCanSort()
                            ? 'pointer'
                            : undefined,
                        }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <FlexRender header={header} />
                        {header.column.getCanSort() && (
                          <>
                            {header.column.getIsSorted() === "asc" && (
                              <ArrowUp className="h-4 w-4 shrink-0" /> // use shrink so the icon doesn't get squeezed if header wraps
                            )}

                            {header.column.getIsSorted() === "desc" && (
                              <ArrowDown className="h-4 w-4 shrink-0" />
                            )}

                            {header.column.getIsSorted() === false && (
                              <ArrowUpDown className="h-4 w-4 shrink-0" />
                            )}
                          </>
                        )}
                      </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  <FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}