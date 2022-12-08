import React, { useState } from "react";

function Count() {
  const [count, setCount] = useState("");

  return <div>totalCount: {count} 개</div>;
}

export default Count;
