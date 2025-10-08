import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: 'My Next.js App',
  description: 'Demo app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: '10px', background: '#f5f5f5', marginBottom: '20px' }}>
          <nav style={{ display: 'flex', gap: '20px' }}>
            <Link href="/">Home</Link>
            <Link href="/products">Products</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
