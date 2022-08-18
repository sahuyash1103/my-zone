import React from "react";
import { useEffect, useState } from 'react';
import { getProdeucts, getBanners } from '../../api/store-api';
import Layout from "./layout/Layout";
import _ from "lodash"
import "./Home.css";

function Home() {
  const [products, setProducts] = useState([]);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getProdeucts()
      .then((result => setProducts(result)))
      .catch((error => console.log(error)));

    getBanners()
      .then((result) => setBanners(result))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="home">
      <div className="home__container">
        {
          banners && banners.map(((banner, i) =>
            <img
              className="home__image"
              key={i}
              src={banner.banner}
              alt={banner.description} />))}
        {
          _.chunk(products, 3).map((product, i) => <Layout key={i} products={product} />)
        }
      </div>
    </div>
  );
}

export default Home;
