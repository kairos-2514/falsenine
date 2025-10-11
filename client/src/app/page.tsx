// app/page.tsx

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--color-luna)] flex flex-col items-center justify-center">
      <h1 className="text-5xl text-[var(--color-flame)] mb-8">
        RailwayGank Font Test
      </h1>
      <p className="text-xl text-[var(--color-night)] font-normal mb-4">
        This paragraph uses the custom &quot;FalseNine&quot; font with Tailwind
        CSS.
      </p>
      <button className="bg-[var(--color-flame)] text-[var(--color-luna)] px-6 py-3 rounded-lg shadow-lg font-normal hover:bg-[var(--color-night)] hover:text-[var(--color-flame)] transition">
        Styled Button
      </button>
      <div className="mt-12 text-sm text-[var(--color-iron)]">
        Scrollbars should be hidden; check overflow areas below.
      </div>
      <div className="mt-2 w-[300px] h-[60px] overflow-x-scroll border border-[var(--color-iron)]">
        <div className="w-[900px] h-full flex items-center">
          <span className="mr-6">
            Overflow test area – scroll horizontally to confirm no scrollbar.
          </span>
          <span>|</span>
          <span className="ml-6">More content&nbsp;&nbsp;&nbsp;&nbsp;→</span>
        </div>
      </div>
    </main>
  );
}
