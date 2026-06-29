interface AppointmentCardProps {
  date: string;
  time: string;
  doctorName: string;
  specialty: string;
  status?: "confirmed" | "pending";
}

export default function AppointmentCard({ date, time, doctorName, specialty, status = "confirmed" }: AppointmentCardProps) {
  return (
    <div className="bg-white rounded-[var(--radius-card)] border border-gray-100 shadow-[var(--shadow-soft)] p-4 flex gap-3">
      <div className="w-14 h-14 rounded-xl bg-primary-50 flex flex-col items-center justify-center flex-shrink-0">
        <span className="text-[10px] font-bold text-primary-600 uppercase">{date.split(" ")[0]}</span>
        <span className="text-[18px] font-bold text-primary-700 leading-none">{time.split(":")[0]}</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-display font-bold text-[14px] text-gray-900 truncate">{doctorName}</p>
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${status === "confirmed" ? "bg-success-50 text-success-600" : "bg-amber-50 text-amber-600"}`}>
            {status === "confirmed" ? "مؤكد" : "قيد الانتظار"}
          </span>
        </div>
        <p className="text-[12px] text-gray-500 mt-0.5">{specialty}</p>
        <p className="text-[12px] text-primary-600 font-medium mt-1">{time}</p>
      </div>
    </div>
  );
}
