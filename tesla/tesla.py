#!/usr/bin/env python

# %%

pip install yfinance

# %%


import yfinance as yf
tesla = yf.Ticker("TSLA")

print(tesla.info)

# %%
data_df = yf.download("TSLA", start="2011-01-01", end="2022-03-01", period="1d")
data_df.to_csv('tesla.csv')
# %%
