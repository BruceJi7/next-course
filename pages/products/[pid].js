import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {

  const { loadedProduct } = props;

  if (!loadedProduct){
    return <div>Loading...</div>
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <div>{loadedProduct.description}</div>
    </>
  )
}

async function getData(){
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  return JSON.parse(jsonData);

}

export async function getStaticProps(context){
  const { params } = context;
  const productId = params.pid;
  const data = await getData();
  const product = data.products.find(product => product.id === productId)

  if (!product){
    return {
      props: {
        isFound:false,
        loadedProduct:null
      }
    }; 
  }

  return {
    props: {
      isFound:true,
      loadedProduct:product
    }
  };
}

export async function getStaticPaths(){

  const data = await getData();

  const ids = data.products.map(product => product.id);
  const pathsWithParams = ids.map(id => ({params: {pid:id}}));
  
  return {
    paths:pathsWithParams,
    fallback:true
  }
}


export default ProductDetailPage
