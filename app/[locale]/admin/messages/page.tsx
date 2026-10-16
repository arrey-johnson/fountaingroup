import { setRequestLocale } from "next-intl/server";
import { getContactMessages } from "@/lib/data/repository";

export default async function AdminMessagesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getContactMessages();

  return (
    <div>
      <h1 className="font-display text-3xl">Messages</h1>
      {messages.length === 0 ? (
        <p className="mt-6 text-muted">No contact messages yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {messages.map((m) => (
            <li key={m.id} className="border border-border bg-white p-4 text-sm">
              <p className="font-semibold">{m.subject}</p>
              <p className="text-muted">{m.name} · {m.email} · {m.category}</p>
              <p className="mt-2">{m.message}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
