import { useEffect } from "react";
import { useState } from "react";
import { urlPrefix } from "../misc/resuse";
import "./Store.css";

export default function Store() {
  function change(productId) {
    window.location.href = "/store/view/" + productId;
  }
  const [products, setProducts] = useState();

  useEffect(() => {
    fetch(urlPrefix() + "/store", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(async (response) => {
      var res = await response.json();
      console.log(res);
      setProducts(res);
    });
  }, []);

  return (
    <div class="store">
      <div class="store-landing">
        <h1 class="landing-title">New Retro Games? Its all here!</h1>
      </div>
      {!products ? (
        <div>
          <h1>No Products Found</h1>
        </div>
      ) : (
        <div>
          {
            products.map((productlist) => {
              return (<div class="productlist">
                {productlist.map((product) => {
                  return (
                  <div class="list-item" onClick={() => change(product.id)}>
                    <div class="item-image">
                      <img
                        height="200px"
                        width="200px"
                        alt="ok"
                        src={product.images[0]}
                      />
                    </div>
                    <div class="item-details">
                      <h1 class="item-title">{product.game_name}</h1>
                      <div class="same-line">
                        <p class="price">
                          {" "}
                          <span class="bold"> Cost: ₹{product.cost}</span>{" "}
                        </p>
                      </div>
                    </div>
                  </div>);
                })}
              </div>);
            })
        }
        
        </div>
      )}
    </div>
  );
}
