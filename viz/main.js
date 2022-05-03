import "/style.css";
import * as d3 from "https://unpkg.com/d3?module";
import { generateTweetsVsPrice } from "./mainVisualization";

// document.querySelector("#app").innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `;

(async () => {
  const bitcoin = await d3.csv("/coin_Bitcoin.csv");
  const dogecoin = await d3.csv("/coin_Dogecoin.csv");
  const tesla = await d3.csv("/tesla.csv");

  const datasets = {
    bitcoin: bitcoin,
    dogecoin: dogecoin,
    tesla: tesla,
  };
  let tweets = await d3.csv("/alltweets.csv");

  const radioSelect = d3.selectAll(".radio");
  radioSelect.on("change", (e) =>
    generateTweetsVsPrice(tweets, datasets[e.target.value])
  );
  generateTweetsVsPrice(tweets, datasets["bitcoin"]);
})();
