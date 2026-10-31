import "./globals.css";

export const metadata = {
  title: "Trilok Neupane | Web Developer & DevOps Engineer",
  description:
    "Portfolio for Trilok Neupane: frontend engineering, DevOps, and production deployment work.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-noise" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
