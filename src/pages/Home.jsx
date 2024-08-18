import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";

function Home() {
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (user) {
      axiosClient
        .get("/products")
        .then((data) => console.log(data))
        .catch((data) => console.log(data));
    }
  });
  return <div>Home</div>;
}

export default Home;
