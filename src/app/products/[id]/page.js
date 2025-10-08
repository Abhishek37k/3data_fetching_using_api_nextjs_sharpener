import LogoutButton from "./LogoutButton";

export async function generateStaticParams() {
  const res = await fetch("https://dummyjson.com/products");
  const data = await res.json();
  return data.products.map((product) => ({
    id: product.id.toString(),
  }));
}

async function getProduct(id) {
  const res = await fetch(`https://dummyjson.com/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch product details");
  }
  return res.json();
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div style={{ padding: "20px" }}>
      <h1>
        {product.title} &nbsp;
        <LogoutButton /> {/* ✅ Client Component here */}
      </h1>

      <img
        src={product.thumbnail}
        alt={product.title}
        style={{
          width: "400px",
          height: "300px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />

      <img
        src="/images/download.jpg"
        width={400}
        style={{ borderRadius: "8px", marginTop: "20px" }}
        alt="batman image"
      />

      <p>{product.description}</p>
      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Brand:</strong> {product.brand}
      </p>

      <a
        href="/products"
        style={{ color: "blue", textDecoration: "underline" }}
      >
        ← Back to Products
      </a>
    </div>
  );
}
