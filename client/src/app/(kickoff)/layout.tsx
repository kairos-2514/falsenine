export default function KickoffLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-[80vh] bg-night text-white">
      <div className="mx-auto max-w-xl px-4 py-16 md:py-24">{children}</div>
    </div>
  );
}
