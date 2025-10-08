import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "My Next.js App",
  description: "Demo app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            padding: "10px",
            background: "#f5f5f5",
      
          }}
        >
          <nav style={{ display: "flex", gap: "20px", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <Link href="/">Home</Link>&nbsp; | &nbsp;
              <Link href="/products">Products</Link>&nbsp; | &nbsp;
              <Link href="/login" style={{ marginLeft: "10px" }}>Login</Link>
            </div>
            <div>
              <img src="/images/logo.jpg" width={70} alt="Logo" />
            </div>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
