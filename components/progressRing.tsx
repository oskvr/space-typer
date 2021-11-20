export default function ProgressRing({children, value}:any){
    const circumference = 30 * 2 * Math.PI
    return(
        <div
          className="relative rounded-full"
        >
          <div className="grid place-items-center">

          <svg className="w-20 h-20 -rotate-90">
            <circle
              className="text-gray-300"
              strokeWidth="5"
              stroke="currentColor"
              fill="transparent"
              r="30"
              cx="40"
              cy="40"
              />
            <circle
              className="text-blue-600"
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - value / 100 * circumference}
              strokeLinecap="square"
              stroke="currentColor"
              fill="transparent"
              r="30"
              cx="40"
              cy="40"
              />
          </svg>
          <span className="text-xl text-blue-700 -mt-20">{children}</span>
              </div>
        </div>
    
    )
}