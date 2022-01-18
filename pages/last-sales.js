import React from "react";
import useSWR from "swr";

export default function LastSalesPage(props) {
  async function fetcher(...args){
    return fetch(...args).then((res) => res.json())
    .then((data) => {
            const sales = [];
            for (const key in data) {
              sales.push({
                id: key,
                username: data[key].username,
                volume: data[key].volume,
              });
            };
            return sales
  })
}

  const { data, error } = useSWR(
    "https://nextjs-course-51fab-default-rtdb.firebaseio.com/sales.json",
    (url) => fetcher(url)
  );

  if (error) {
    console.log(`error`, error)
    return <div>Error loading data</div>;
  }

  return (
    <ul>
      {!data && !error ?   
        props.sales.map((sale) => (
          <li key={sale.id}>
            {sale.username} - {sale.volume} items
          </li>
        )):
        data.map((sale) => (
          <li key={sale.id}>
            {sale.username} - {sale.volume} items
          </li>
        ))
      }
    </ul>
  );
}

export async function getStaticProps(){
  const response = await fetch("https://nextjs-course-51fab-default-rtdb.firebaseio.com/sales.json");
  const data = await response.json();
  const sales = [];
    for (const key in data) {
      sales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }
    return {props: {sales: sales}, revalidate:10};
}
