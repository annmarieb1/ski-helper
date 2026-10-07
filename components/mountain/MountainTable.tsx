"use client";

/*
 * MountainTable.tsx
 * Table to display mountain data
 */

import {
  useTable,
  tableFeatures,
  FlexRender
} from '@tanstack/react-table';
import type { ColumnDef } from '@tanstack/react-table';

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
  if (passName === "Epic") {
    return <p key={passName} className='rounded-lg bg-orange-400'>{passName}</p>
  } else if (passName === "Indy") {
    return <p key={passName} className='rounded-lg bg-red-500'>{passName}</p>
  } else if (passName === "Ikon") {
    return <p key={passName} className='rounded-lg bg-blue-500/95'>{passName}</p>
  } else if (passName === "Nitro") {
    return <p key={passName} className='rounded-lg bg-yellow-300'>{passName}</p>
  } else {
    return <p key={passName} className='rounded-lg bg-gray-300'>{passName}</p>
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
        <p>Weekday estimate: ${pricing.liftTicketWeekday}</p>
      )}

      {pricing.liftTicketWeekend !== undefined && (
        <p>Weekend estimate: ${pricing.liftTicketWeekend}</p>
      )}
    </div>
  );
}

const features = tableFeatures({});

const columns: Array<ColumnDef<typeof features, Mountain>> = [
  {
    accessorKey: 'name',
    header: 'Mountain/Resort',
  },
  {
    accessorKey: 'state',
    header: 'State/Location',
  },
  //   header: 'Drive Time',
  //   cell: () => "-Drive time",
  // },
  {
    accessorKey: 'trails',
    header: 'Trail Difficulty Distribution',
    cell: (info) => {
      const mountain = info.row.original;
      return (
        <DifficultyBar trails={mountain.trails} />
      );
    }
  },
  {
    accessorKey: 'verticalDrop',
    header: 'Vertical Drop (ft)',
  },
  {
    accessorKey: 'pricing',
    header: 'Estimated Adult Lift Ticket Price (avg, in USD)',
    cell: (info) => {
      const mountain = info.row.original;
      return renderLiftTicketPrices(mountain.pricing);
    }
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
    }
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
                    <FlexRender header={header} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
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