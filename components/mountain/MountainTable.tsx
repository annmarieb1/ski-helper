/*
 * MountainTable.tsx
 * Table to display mountain data
 */

import type { Mountain } from "@/types/MountainTypes";

import DifficultyBar from "@/components/mountain/DifficultyBar";

interface MountainTableProps {
  mountains: Mountain[];
}

/*
* color coding for pass access col
*/
function renderPassAccess(passName: string) {
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

export default function MountainTable({
    mountains,
}: MountainTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border my-3">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-2 py-3 text-left">Mountain/Resort</th>
            <th className="px-2 py-3 text-left">State/Location</th>
            {/* <th className="px-2 py-3 text-right">Drive Time</th> */}
            <th className="px-2 py-3 text-left">Trail Difficulty Distribution</th>
            <th className="px-2 py-3 text-left">Vertical Drop (ft)</th>
            <th className="px-2 py-3 text-left">Estimated Adult Lift Ticket Price</th>
            <th className="px-2 py-3 text-left">Pass Access</th>
            <th className="px-2 py-3 text-left">Snowfall</th>
            <th className="px-2 py-3 text-left">OpenWeather</th>
          </tr>
        </thead>

        <tbody>
          {mountains.map((mountain) => (
            <tr
              key={mountain.id}
              className="border-t-2 hover:bg-gray-50"
            >
              {/* Mountain/resort */}
              <td className="px-2 py-3 font-medium">
                {mountain.name}
              </td>

              {/* Location */}
              <td className="px-2 py-3">
                {mountain.state}
              </td>

              {/* Trail difficulty */}
              <td className="px-2 py-3">
                <DifficultyBar trails={mountain.trails} />
              </td>

              {/* Vertical Drop */}
              <td className="px-2 py-3 text-center">
                {mountain.verticalDrop}
              </td>

              {/* Adult Lift Ticket Price */}
              <td className="px-2 py-3">
                {Object.keys(mountain.pricing).length !== 0
                ? 
                  (
                    <div>
                      <p>Weekday estimate: ${mountain.pricing.liftTicketWeekday}</p>
                      <p>Weekend estimate: ${mountain.pricing.liftTicketWeekend}</p>
                    </div>
                  )
                :
                  (<p>No lift ticket estimates available</p>)
                }
              </td>

              {/* Pass access */}
              <td className="px-2 py-3 text-center">
                {mountain.passes.map(mp => { return renderPassAccess(mp.passName) }
                )}
              </td>

              {/* Snowfall */}
              <td className="px-2 py-3 text-center">
                {<p>Snowfall</p>}
              </td>

              {/* Open Weather */}
              <td className="px-2 py-3 text-center">
                {<p>Open Weather</p>}
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