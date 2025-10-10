export const revalidate = 60; 

async function getProducts() {
  const res = await fetch('https://dummyjson.com/products', {
    next: { revalidate: 60 } // you can also configure revalidate here
  });
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}
export const metadata = {
  title: "Products Page",
  description: "Browse our products",
};

export default async function ProductsPage() {
  const data = await getProducts();
  const products = data.products;
  console.log('Fetched products:', products);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Products</h1>
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', listStyle: 'none' }}>
        {products.map(product => (
          <li key={product.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
            <h3>{product.title}</h3>
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '6px' }} 
            />
            <p>Price: ${product.price}</p>
            <a href={`/products/${product.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
              View Details
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
