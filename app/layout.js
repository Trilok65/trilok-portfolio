import "./globals.css";

export const metadata = {
  title: "Trilok Neupane | Web Developer & DevOps Engineer",
  description:
    "Portfolio for Trilok Neupane: frontend engineering, DevOps, and production deployment work.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 antialiased">{children}</body>
    </html>
  );
}
