import Link from "next/link";
// import fs from "fs/promises";
// import path from "path";
import { indexProps } from "../SSR";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}><Link href={`/${product.id}`}>{product.title}</Link></li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  return await indexProps();
}

export default HomePage;
