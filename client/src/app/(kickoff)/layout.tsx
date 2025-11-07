import Image from "next/image";

export default function KickoffLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen bg-night text-white">
      {/* Hide global footer on auth routes */}
      <style dangerouslySetInnerHTML={{ __html: `footer{display:none}` }} />

      {/* Split Shell */}
      <div className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
        {/* Left: Form area */}
        <div className="flex items-center bg-white px-6 py-12 text-night md:px-10 lg:px-12">
          <div className="w-full max-w-sm">
            {/* Minimal logo */}
            <div className="mb-10">
              <Image
                src="/icon.svg"
                alt="Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </div>
            {children}
            {/* Footer-like links inside auth only */}
            <div className="mt-12 flex gap-6 text-xs text-night/60">
              <span>Help</span>
              <span>Terms</span>
              <span>Privacy</span>
            </div>
          </div>
        </div>

        {/* Right: Image area */}
        <div className="relative hidden md:block">
          <Image
            src="/images/hero-section-image.png"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
