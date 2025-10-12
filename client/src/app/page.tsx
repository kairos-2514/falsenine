export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--color-night)] text-[var(--color-iron)] p-8">
      {/* Header Section */}
      <header className="mb-12 text-center">
        <h1 className="font-falsenine-mainheading text-6xl md:text-8xl text-[var(--color-flame)] mb-4">
          FalseNine Main Heading
        </h1>
        <p className="font-montserrat text-lg text-[var(--color-luna)]">
          Testing all custom fonts and CSS variables
        </p>
      </header>

      {/* Font Testing Section */}
      <section className="max-w-4xl mx-auto space-y-8">
        {/* FalseNine Font */}
        <div className="bg-[var(--color-night)] border-2 border-[var(--color-flame)] p-6 rounded-lg">
          <h2 className="font-falsenine text-4xl text-[var(--color-flame)] mb-3">
            FalseNine Font Test
          </h2>
          <p className="font-falsenine text-xl text-[var(--color-luna)]">
            The quick brown fox jumps over the lazy dog. 0123456789
          </p>
          <p className="font-falsenine text-sm mt-2 text-[var(--color-iron)] opacity-70">
            Font Family: RailwayGank-DEMO.otf
          </p>
        </div>

        {/* FalseNine Main Heading Font */}
        <div className="bg-[var(--color-night)] border-2 border-[var(--color-flame)] p-6 rounded-lg">
          <h2 className="font-falsenine-mainheading text-4xl text-[var(--color-flame)] mb-3">
            FalseNine Main Heading Font
          </h2>
          <p className="font-falsenine-mainheading text-xl text-[var(--color-luna)]">
            The quick brown fox jumps over the lazy dog. 0123456789
          </p>
          <p className="font-montserrat text-sm mt-2 text-[var(--color-iron)] opacity-70">
            Font Family: StealWerksClosed
          </p>
        </div>

        {/* Montserrat Font */}
        <div className="bg-[var(--color-night)] border-2 border-[var(--color-flame)] p-6 rounded-lg">
          <h2 className="font-montserrat text-4xl font-bold text-[var(--color-flame)] mb-3">
            Montserrat Font Test
          </h2>
          <div className="space-y-2">
            <p className="font-montserrat font-thin text-[var(--color-luna)]">
              Thin (100): The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-montserrat font-light text-[var(--color-luna)]">
              Light (300): The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-montserrat font-normal text-[var(--color-luna)]">
              Regular (400): The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-montserrat font-medium text-[var(--color-luna)]">
              Medium (500): The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-montserrat font-semibold text-[var(--color-luna)]">
              Semibold (600): The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-montserrat font-bold text-[var(--color-luna)]">
              Bold (700): The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-montserrat font-extrabold text-[var(--color-luna)]">
              Extrabold (800): The quick brown fox jumps over the lazy dog
            </p>
            <p className="font-montserrat font-black text-[var(--color-luna)]">
              Black (900): The quick brown fox jumps over the lazy dog
            </p>
          </div>
        </div>

        {/* Color Variables Test */}
        <div className="bg-[var(--color-night)] border-2 border-[var(--color-flame)] p-6 rounded-lg">
          <h2 className="font-falsenine-mainheading text-3xl text-[var(--color-flame)] mb-4">
            Color Variables Test
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-24 bg-[var(--color-luna)] rounded mb-2"></div>
              <p className="font-montserrat text-sm">Luna</p>
              <p className="font-montserrat text-xs opacity-70">#cec8bc</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-[var(--color-night)] border border-[var(--color-iron)] rounded mb-2"></div>
              <p className="font-montserrat text-sm">Night</p>
              <p className="font-montserrat text-xs opacity-70">#0d0208</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-[var(--color-flame)] rounded mb-2"></div>
              <p className="font-montserrat text-sm">Flame</p>
              <p className="font-montserrat text-xs opacity-70">#ff1800</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 bg-[var(--color-iron)] rounded mb-2"></div>
              <p className="font-montserrat text-sm text-[var(--color-night)]">
                Iron
              </p>
              <p className="font-montserrat text-xs text-[var(--color-night)] opacity-70">
                #d8d8d8
              </p>
            </div>
          </div>
        </div>

        {/* Scrollbar Test */}
        <div className="bg-[var(--color-night)] border-2 border-[var(--color-flame)] p-6 rounded-lg">
          <h2 className="font-falsenine-mainheading text-3xl text-[var(--color-flame)] mb-4">
            Scrollbar Hidden Test
          </h2>
          <div className="h-40 overflow-y-scroll bg-[var(--color-luna)] bg-opacity-10 p-4 rounded">
            <p className="font-montserrat text-[var(--color-luna)] mb-2">
              Scroll this area - the scrollbar should be hidden but scrolling
              should still work.
            </p>
            {[...Array(20)].map((_, i) => (
              <p
                key={i}
                className="font-montserrat text-[var(--color-iron)] mb-1"
              >
                Line {i + 1}: This is test content to create overflow
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center">
        <p className="font-montserrat text-sm text-[var(--color-luna)] opacity-70">
          All fonts and CSS variables working correctly ✓
        </p>
      </footer>
    </div>
  );
}
