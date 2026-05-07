type Props = {
  points: string[];
  className?: string;
};

export default function OralPlan({ points, className }: Props) {
  return (
    <div
      className={`relative mt-8 border-l-2 border-accent/50 pl-5 ${className ?? ""}`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
        Plan d&apos;oral &middot; a dire
      </p>
      <ol className="mt-3 flex flex-wrap items-center gap-2">
        {points.map((p, i) => (
          <li
            key={i}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.15em] text-fg/85"
          >
            <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
            <span>{p}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
