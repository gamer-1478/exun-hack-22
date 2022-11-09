import { Notyf } from "notyf";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { urlPrefix } from "../misc/resuse";
import "./Item.css";

export default function ItemPage() {
  var notyf = new Notyf();
  const [product, setProduct] = useState();
  var { gameId } = useParams();

  useEffect(() => {
    fetch(urlPrefix() + "/store/" + gameId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(async (response) => {
      var res = await response.json();
      console.log(res);
      setProduct(res);
    });
  }, []);

  function addtoCart() {
    fetch(urlPrefix() + "/cart/add/" + gameId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(async (response) => {
      var res = await response.json();
      notyf.success(res.msg);
    });
  }
  return (
    <div class="store">
      {!product ? (
        <div>
          <h1>No Product Found</h1>
        </div>
      ) : (
        <div className="store-container">
          <div className="landing-image">
            <img src={product.images[0]} alt="ok" />
          </div>
          <div className="landing-details">
            <h1>{product.game_name}</h1>
            <h2>{product.description}</h2>
            <h3>Price: ₹{product.cost}</h3>
            <button className="signup-button" onClick={()=>addtoCart()}>Add To Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
