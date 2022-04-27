import "./style.css";
import { csv } from "d3";
import { generateTweetsVsPrice } from "./mainVisualization";

// document.querySelector("#app").innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `;

(async () => {
  const crypto = await csv("/coin_Bitcoin.csv");
  let tweets = await csv("/alltweets.csv");

  generateTweetsVsPrice(tweets, crypto);
})();
