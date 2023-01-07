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
        <main>{children}</main>
      </body>
    </html>
  );
}
