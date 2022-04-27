import "./style.css";
import * as d3 from "d3";
import { generateTweetsVsPrice } from "./mainVisualization";

// document.querySelector("#app").innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `;

(async () => {
  const crypto = await d3.csv("/coin_Bitcoin.csv");
  let tweets = await d3.csv("/alltweets.csv");

  generateTweetsVsPrice(tweets, crypto);
})();
