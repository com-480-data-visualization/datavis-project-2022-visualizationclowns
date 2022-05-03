import "/style.css";
import * as d3 from "https://unpkg.com/d3?module";
import { generateTweetsVsPrice } from "./mainVisualization";

// document.querySelector("#app").innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `;

(async () => {
  const radioSelect = d3.selectAll(".radio");
  radioSelect.on("change", (e) => console.log(e.target.value));

  const crypto = await d3.csv("/coin_Bitcoin.csv");
  let tweets = await d3.csv("/alltweets.csv");

  generateTweetsVsPrice(tweets, crypto);
})();
