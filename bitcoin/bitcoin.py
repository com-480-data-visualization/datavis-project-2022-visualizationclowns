#!/usr/bin/env python

# %%

pip install yfinance

# %%


import yfinance as yf
btc = yf.Ticker("BTC-USD")

print(btc.info)

# %%
data_df = yf.download("BTC-USD", start="2011-01-01", end="2022-03-01", period="1d")
data_df.to_csv('bitcoin.csv')
# %%
