/*
 * Table to display mountain data
 */

import type { Mountain } from "@/types/MountainType";

import Difficulties from "@/components/filters/DifficultyFilter";

interface MountainTableProps {
  mountains: Mountain[];
}

/*
 * some color coding for pass access
 */
function renderPassAccess(passName: string) {
  if (passName === "Epic") {
    return <p key={passName} className='rounded-lg bg-orange-400'>{passName}</p>
  } else if (passName === "Indy") {
    return <p key={passName} className='rounded-lg bg-red-500'>{passName}</p>
  } else if (passName === "Ikon") {
    return <p key={passName} className='rounded-lg bg-blue-800/85'>{passName}</p>
  } else if (passName === "Nitro") {
    return <p key={passName} className='rounded-lg bg-yellow-300'>{passName}</p>
  } else {
    return <p key={passName} className='rounded-lg bg-gray-300'>{passName}</p>
  }
}

export default function MountainTable({
  mountains,
}: MountainTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Mountain/Resort</th>
            <th className="px-4 py-3 text-left">State/Location</th>
            <th className="px-4 py-3 text-left">Trail Difficulty Distribution</th>
            <th className="px-4 py-3 text-left">Adult Lift Ticket Price</th>
            <th className="px-4 py-3 text-left">Pass Access</th>
            <th className="px-4 py-3 text-right">Drive Time</th>
          </tr>
        </thead>

        <tbody>
          {mountains.map((mountain) => (
            <tr
              key={mountain.id}
              className="border-t hover:bg-gray-50"
            >
              {/* Mountain/resort */}
              <td className="px-4 py-3 font-medium">
                {mountain.name}
              </td>

              {/* Location */}
              <td className="px-4 py-3">
                {mountain.state}
              </td>

              {/* Trail difficulty */}
              <td className="px-4 py-3">
                <span>🟩🟩🟦🟦🟦⬥⬥⬥♦️🌲</span>
              </td>

              {/* Adult Lift Ticket Price */}
              <td className="px-4 py-3">
                Lift ticket price range
              </td>

              {/* Pass access */}
              <td className="px-4 py-3 text-right">
                {mountain.passes.map(mp => { return renderPassAccess(mp.passName) }
                )}
              </td>

              {/* Drive time */}
              <td className="px-4 py-3 text-right">
                Drive time
              </td>
            </tr>
          ))}

          {mountains.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="px-4 py-8 text-center text-gray-500"
              >
                No mountains found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}