import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <article>
      <h1>404</h1>

      <h3>Page not Found</h3>
      <Link to="/">back home</Link>
    </article>
  );
};

export default Error;
