import Navbar from "../components/navbar/navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head></head>
      <body>
        <header></header>
        <main>
          {/* <Navbar /> */}
          {children}
        </main>
      </body>
    </html>
  );
}
