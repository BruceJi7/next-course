import React, { useEffect, useState } from "react";

export default function LastSalesPage() {
  const [salesData, setSalesData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("https://nextjs-course-51fab-default-rtdb.firebaseio.com/sales.json")
      .then((response) => response.json())
      .then((data) => {
        const sales = [];
        for (const key in data) {
          sales.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }

        setSalesData(sales);
        setLoading(false);
      });
  }, []);

  if (isLoading){
    return <div>Loading...</div>
  }

  if (!salesData){
    return <div>No data</div>
  }

  return <ul>
    {salesData.map((sale)=> <li key={sale.id}>{sale.username} - {sale.volume} items</li>)}
  </ul>;
}
