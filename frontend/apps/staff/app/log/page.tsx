import Link from "next/link";
import { ArrowLeft, CheckCircle, XCircle } from "lucide-react";

const mockLog = [
  { id: "1", time: "19:45:32", name: "Nguyễn Văn A", ticket: "VIP - A5", status: "success" },
  { id: "2", time: "19:44:18", name: "Trần Thị B", ticket: "VIP - A6", status: "success" },
  { id: "3", time: "19:43:05", name: "Lê Văn C", ticket: "Standard - C10", status: "fail", reason: "Vé đã sử dụng" },
  { id: "4", time: "19:42:50", name: "Phạm D", ticket: "Standard - D3", status: "success" },
  { id: "5", time: "19:41:30", name: "Hoàng E", ticket: "VIP - B2", status: "success" },
  { id: "6", time: "19:40:15", name: "Unknown", ticket: "N/A", status: "fail", reason: "QR không hợp lệ" },
];

export default function StaffLogPage() {
  return (
    <div className="min-h-screen p-4 space-y-4">
      <div className="flex items-center gap-3">
        <Link href="/scan" className="text-zinc-400 hover:text-zinc-200"><ArrowLeft className="h-5 w-5" /></Link>
        <h1 className="text-lg font-bold">Nhật ký check-in</h1>
      </div>

      <div className="space-y-2">
        {mockLog.map((entry) => (
          <div key={entry.id} className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 p-3">
            {entry.status === "success" ? (
              <CheckCircle className="h-5 w-5 shrink-0 text-green-400" />
            ) : (
              <XCircle className="h-5 w-5 shrink-0 text-red-400" />
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-200">{entry.name}</p>
              <p className="text-xs text-zinc-500">{entry.ticket}{entry.reason ? ` • ${entry.reason}` : ""}</p>
            </div>
            <span className="text-xs text-zinc-500">{entry.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
