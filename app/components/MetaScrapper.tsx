import React, { useEffect, useState } from "react";

export const MetaScrapper = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(`api/scrapper?url=${url}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }).then((response) => response.json());
      console.log(response);
    };
    getData();
  }, [url]);

  return (
    <div>
      <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
    </div>
  );
};
