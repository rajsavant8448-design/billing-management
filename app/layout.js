import "./globals.css";

export const metadata = {
  title: "BillPro - Billing Management",
  description: "Professional Billing Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}