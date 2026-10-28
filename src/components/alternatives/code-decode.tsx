import Link from 'next/link';
import { decodeModelString } from '@/lib/alternatives/code-decode';

/**
 * Segment-by-segment breakdown of a competitor model code.
 *
 * Renders nothing when the page's model string is an OEM part number rather than a
 * model code — those pages have no ordering key to decode.
 */
export function CodeDecodeBlock({ model }: { model: string }) {
  const groups = decodeModelString(model);
  if (!groups.length) return null;

  return (
    <section className="border-b border-[rgba(44,74,115,0.10)]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-12 md:py-14">
        <p className="font-label text-xs text-[#62666C] uppercase tracking-wider mb-2">Code anatomy</p>
        <h2 className="font-heading text-xl md:text-2xl font-medium text-[#1B1E20] mb-3">
          What each part of {groups.length > 1 ? 'these codes' : 'this code'} means
        </h2>
        <p className="text-sm text-[#4A4E54] leading-relaxed max-w-3xl mb-6">
          Every segment below is read from the manufacturer&rsquo;s published ordering key. Where a segment is not
          published, we say so instead of guessing — those are the ones to confirm from the tag or the drawing
          before ordering.
        </p>

        <div className="space-y-8">
          {groups.map((g) => (
            <div key={g.code}>
              <div className="flex flex-wrap items-baseline gap-3 mb-3">
                <p className="font-mono text-sm text-[#1B1E20] m-0">{g.code}</p>
                <p className="text-xs text-[#62666C] m-0 uppercase tracking-wider">{g.family}</p>
              </div>
              <div className="overflow-hidden border border-[rgba(44,74,115,0.10)] rounded-md bg-white max-w-3xl">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[rgba(44,74,115,0.10)] bg-[#F7F8FA]">
                      <th className="text-left py-2.5 px-4 font-medium text-[#1B1E20] w-24">Segment</th>
                      <th className="text-left py-2.5 px-4 font-medium text-[#1B1E20] w-44">Field</th>
                      <th className="text-left py-2.5 px-4 font-medium text-[#1B1E20]">What it tells you</th>
                    </tr>
                  </thead>
                  <tbody>
                    {g.rows.map((r, i) => (
                      <tr
                        key={`${r.segment}-${i}`}
                        className="border-b border-[rgba(44,74,115,0.08)] last:border-b-0 align-top"
                      >
                        <td className="py-2.5 px-4 font-mono text-xs text-[#1B1E20] whitespace-nowrap">{r.segment}</td>
                        <td className="py-2.5 px-4 text-[#62666C] text-xs">{r.field}</td>
                        <td
                          className={`py-2.5 px-4 text-sm leading-relaxed ${
                            r.confirmed ? 'text-[#4A4E54]' : 'text-[#62666C] italic'
                          }`}
                        >
                          {r.meaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {g.note && <p className="text-xs text-[#62666C] max-w-3xl mt-3 leading-relaxed">{g.note}</p>}
            </div>
          ))}
        </div>

        <p className="text-xs text-[#62666C] mt-6">
          Full ordering key and how to read a tag:{' '}
          <Link href="/alternatives/how-to-identify" className="text-[#2C4A73] no-underline hover:underline">
            identifying a rotary actuator
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
