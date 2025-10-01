"use client"
import { useEffect, useState } from "react";

type User = { id?: string; email: string; name?: string; role: string };

export default function AdminUsersPage() {
  const [items, setItems] = useState<User[]>([]);

  const load = async () => {
    const res = await fetch("/api/users");
    setItems(await res.json());
  };
  useEffect(() => { load(); }, []);

  return (
    <div className="bg-white rounded-3xl p-5">
      <h1 className="text-[var(--primaryColor)] font-black">کاربران</h1>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-gray-500">
              <th className="text-right py-2 px-3">ایمیل</th>
              <th className="text-right py-2 px-3">نام</th>
              <th className="text-right py-2 px-3">نقش</th>
            </tr>
          </thead>
          <tbody>
            {items.map(u => (
              <tr key={u.id} className="border-t">
                <td className="py-2 px-3">{u.email}</td>
                <td className="py-2 px-3">{u.name || '-'}</td>
                <td className="py-2 px-3">{u.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


