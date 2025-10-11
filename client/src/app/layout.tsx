import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "FalseNine — Born from Football, Built for Streets",
    template: "%s | FalseNine",
  },
  description:
    "FalseNine is a premium streetwear label inspired by football culture. Born from the game, built for the streets — crafted for players, creators, and rule-breakers who move different.",
  keywords: [
    "FalseNine",
    "football streetwear",
    "sportswear brand",
    "athletic fashion",
    "urban football apparel",
    "premium jerseys",
    "street fashion",
    "performance wear",
  ],
  metadataBase: new URL("https://falseninejersey.shop"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "FalseNine",
    title: "FalseNine — Born from Football, Built for Streets",
    description:
      "Premium football-inspired streetwear brand redefining sports fashion. Born from the game, built for the streets.",
    images: [
      {
        url: "/falsenine-logo.jpg",
        width: 1200,
        height: 630,
        alt: "FalseNine — Born from Football, Built for Streets",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FalseNine — Born from Football, Built for Streets",
    description:
      "Premium football-inspired streetwear. For those who play different — on and off the pitch.",
    images: ["/falsenine-logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <meta name="theme-color" content="#0d0208" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
