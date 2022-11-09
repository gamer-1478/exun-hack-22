import { Notyf } from "notyf";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router";
import { urlPrefix } from "../misc/resuse";
import "./Cart.css";

export function Cart() {
    var notyf = new Notyf();
    const [cart, setCart] = useState();
  useEffect(() => {
    fetch(urlPrefix() + "/cart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then(async (response) => {
      var res = await response.json();
      console.log(res)
      setCart(res.cart);
    });
  }, []);

  function del(id){
    fetch(urlPrefix() + "/cart/delete/"+ id, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
    }).then(async (response) => {
        var res = await response.json();
        notyf.success(res.msg)
        setCart(res.cart)
        window.location.reload()
      });
  }

return(
    <div>

   
    {!cart ? (
        <div>
          <h1>No Product Found</h1>
        </div>
      ) :
    (
        <div className="cart">
        {cart.map((element) => (
            <div className="cart-element">
                <div className="image"><img src={element.images[0]} alt="image"></img></div>
                <div className="game">  {element.game_name}</div>
                <div className="cost">{element.cost}</div>
                <button class='dlt' onClick={()=>{del(element.id)}}>Delete</button>
            </div>
      ))}
    </div>
    )
    }
    </div>
)

  }
