export default function RingProgress({ label, percentage }:{label:string|number, percentage:number}) {
  const circle = { c: 145, r: 120, w:20 };
  const circumference = ((2 * 22) / 7) * circle.r;
  return (
    <div className="flex items-center justify-center">
      <svg className="scale-75 -rotate-90 w-72 h-72">
        <circle
          cx={circle.c}
          cy={circle.c}
          r={circle.r}
          stroke="currentColor"
          strokeWidth={circle.w}
          fill="transparent"
          className="text-blue-900/30"
        />
        <circle
          cx={circle.c}
          cy={circle.c}
          r={circle.r}
          stroke="currentColor"
          strokeWidth={circle.w}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (percentage / 100) * circumference}
          className={
            percentage > 15
              ? "text-blue-700"
              : "text-red-700"
          }
        />
      </svg>
      <span className="absolute text-5xl font-mono">{label}</span>
    </div>
  );
}