import type { ShiftSlot } from "@/types";

type Props = {
  shiftSlots: ShiftSlot[];
  farmName: string;
};

const ALL_DAYS = ["月", "火", "水", "木", "金", "土", "日"] as const;
type DayOfWeek = (typeof ALL_DAYS)[number];

type SlotsByDay = Partial<Record<DayOfWeek, ShiftSlot[]>>;

function groupByDay(slots: ShiftSlot[]): SlotsByDay {
  return slots.reduce<SlotsByDay>((acc, slot) => {
    const day = slot.dayOfWeek;
    if (!acc[day]) acc[day] = [];
    acc[day]!.push(slot);
    return acc;
  }, {});
}

function slotStatus(slot: ShiftSlot): "available" | "full" {
  return slot.filled < slot.capacity ? "available" : "full";
}

export default function ShiftCalendar({ shiftSlots, farmName }: Props) {
  const slotsByDay = groupByDay(shiftSlots);

  // Only show days that have at least one slot
  const activeDays = ALL_DAYS.filter((d) => slotsByDay[d] && slotsByDay[d]!.length > 0);
  const displayDays = activeDays.length > 0 ? activeDays : ALL_DAYS;

  return (
    <section aria-label={`${farmName}のシフトカレンダー`}>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        今週のシフト空き状況
      </h2>

      {/* Grid */}
      <div
        className="grid gap-2"
        style={{ gridTemplateColumns: `repeat(${displayDays.length}, minmax(0, 1fr))` }}
      >
        {/* Header row */}
        {displayDays.map((day) => {
          const isWeekend = day === "土" || day === "日";
          return (
            <div
              key={`header-${day}`}
              className={[
                "text-center text-xs font-semibold py-1.5 rounded-lg",
                isWeekend
                  ? "bg-[#74C69D]/20 text-[#2D6A4F]"
                  : "bg-gray-100 text-gray-600",
              ].join(" ")}
            >
              {day}
            </div>
          );
        })}

        {/* Slot cells */}
        {displayDays.map((day) => {
          const daySlots = slotsByDay[day];

          if (!daySlots || daySlots.length === 0) {
            return (
              <div
                key={`cell-${day}`}
                className="rounded-xl bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center min-h-[72px]"
              >
                <span className="text-xs text-gray-300">—</span>
              </div>
            );
          }

          return (
            <div key={`cell-${day}`} className="flex flex-col gap-1.5">
              {daySlots.map((slot, idx) => {
                const status = slotStatus(slot);
                const available = slot.capacity - slot.filled;

                return (
                  <div
                    key={idx}
                    className={[
                      "rounded-xl border px-2 py-2 flex flex-col items-center gap-1 transition-colors duration-150",
                      status === "available"
                        ? "bg-[#74C69D]/15 border-[#74C69D]/40"
                        : "bg-gray-100 border-gray-200",
                    ].join(" ")}
                  >
                    {/* Time range */}
                    <span
                      className={[
                        "text-[10px] font-medium leading-none text-center",
                        status === "available" ? "text-[#2D6A4F]" : "text-gray-400",
                      ].join(" ")}
                    >
                      {slot.startTime}
                      <br />
                      {slot.endTime}
                    </span>

                    {/* Capacity indicator */}
                    <div className="flex items-center gap-0.5">
                      <span
                        className={[
                          "text-[10px] font-semibold",
                          status === "available"
                            ? "text-[#2D6A4F]"
                            : "text-gray-400",
                        ].join(" ")}
                      >
                        {available}/{slot.capacity}
                      </span>
                    </div>

                    {/* Visual bar */}
                    <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                      <div
                        className={[
                          "h-1 rounded-full transition-all duration-300",
                          status === "available" ? "bg-[#2D6A4F]" : "bg-gray-400",
                        ].join(" ")}
                        style={{
                          width: `${Math.round((slot.filled / slot.capacity) * 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-[#74C69D]/30 border border-[#74C69D]/50 inline-block" />
          空きあり
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gray-200 border border-gray-300 inline-block" />
          満席
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-sm bg-gray-50 border border-dashed border-gray-300 inline-block" />
          シフトなし
        </span>
      </div>
    </section>
  );
}
