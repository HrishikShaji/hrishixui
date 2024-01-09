import React, { useEffect, useState } from "react";

export const MetaScrapper = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const response = fetch("/api/scrapper", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }), // Pass an object with 'url' property
    })
      .then((response) => response.json())
      .then((data) => console.log(data.json()));
    console.log(response);
  }, [url]);

  return (
    <div>
      <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} />
    </div>
  );
};
