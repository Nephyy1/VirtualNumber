import "./globals.css";

export const metadata = {
  title: "Nephyy Virtual Number",
  description: "Virtual number marketplace for buyers and sellers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
