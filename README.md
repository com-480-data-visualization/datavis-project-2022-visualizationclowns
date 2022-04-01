# Project of Data Visualization (COM-480)

| Student's name | SCIPER |
| -------------- | ------ |
| Albert Aillet | 350968 |
| Alexander Brokking | 350973 |
| Shrirang Bagdi | 350699 |

[Milestone 1](#milestone-1-friday-8th-april-5pm) • 
[Milestone 2](#milestone-2-friday-6th-may-5pm) • 
[Milestone 3](#milestone-3-friday-3rd-june-5pm)

## Milestone 1 (Friday 8th April, 5pm)

**10% of the final grade**

### Dataset

- **Kaggle** [link](https://www.kaggle.com/ayhmrba/elon-musk-tweets-2010-2021?select=2021.csv)

Elon Musk tweets 2011-2021 (March)    

- **Twitter API** [link](https://developer.twitter.com/en/docs/twitter-api)

Elon Musk tweets, Twitter dev API (March 2021 - Current)

- **Yahoo Finance API**: [link](https://pypi.org/project/yfinance/)

Cryptocurrencies 2010-Current 
Tesla stock 2010-Current

### Description

Three main data sources for creating the visualization datasets were identified; Yahoo Finance , Kaggle and Twitter developer API. 

Yahoo Finance provides an easy to use API for fetching high quality asset price data over a predetermined sample period. It will allow us to collect crypto and stock data in the same format and over the same period. Thus, very little preprocessing will be required to combine them for visualization. 

To create the Elon Musk tweet data set, two seperate data sources will have to be leveraged. Firstly, a public domain dataset available on kaggle provides historical tweets between 2011 and March 2021. However, to analyze his more recent tweets, additional tweets will be collected through the twitter developer api and then be used to enhance the original tweet dataset. This requires interfacing with Twitter’s developer api and some data preprocessing to make the datasets compatible. Specifically, columns have to be processed into the same format and any dataset overlap has to be removed. Because there is a limit to how far back into the history tweets can be retrieved using the standard Twitter developer account, the full dataset cannot be created through the Twitter API. Ultimately, the data we are utilizing is of good quality as we are able to use the data as it is for its intended use. 



### Problematic

Elon Musk is a highly public persona and cultural phenomena of the twenty-first century. As one of the world’s richest individuals, Elon Musk has founded several incredibly successful companies including PayPal, the Boring Company, Tesla, and SpaceX. 

With Elon Musk’s influence and large cultural following including almost 80M Twitter followers, many of the things he has to say can have far reaching effects. In recent years, Elon Musk has received criticism and come under scrutiny from media and regulators accusing him of market manipulation of stock markets to cryptocurrency prices [1][2][3]. 

This visualization aims to illustrate the impact Elon Musk's tweets have on the stock and cryptocurrency markets. The visualizations seek to empower people who want to investigate Elon Musk’s potential market influence including future investors who desire to understand the different trends that affect the market. If an influence could be established, it would underline the importance of conducting research and understanding the news and and public figures have put out before investing.  


### Exploratory Data Analysis

See [this notebook](exploration/data_exploration.ipynb). Information about both the collected tweets and the asset price data are presented using plotly graphs.

To get interactive graphs run the notebook locally or online using for example [nbviewer](https://nbviewer.org/), [Binder](https://mybinder.org/) or [Colab](https://colab.research.google.com/) and comment out the following code).
```python 
pio.renderers.default = "png"
``` 


### Related work

There are two recent examples on Kaggle where users have created notebooks analyzing Elon Musk’s tweets impact on the Dogecoin crypto prices [a][b]. One of them focuses on the trading returns using a strategy consisting of investing when Elon Musk references the crypto currency in a tweet. It also includes sentiment analysis of the tweets, but the Kaggle user concludes them as unsatisfactory. The second notebook puts greater emphasis on Elon Musk’s potential Twitter impact on the Dogecoin asset price and identifies a set of tweets that could have been highly influential. 

Neither of the notebooks create any interactive visualizations that allow the user to idiosyncratically investigate the data. Moreover, the data is limited to the period up to March 2021 and only focuses on the Dogecoin crypto. It would thus be interesting to expand these analyses with more recent data and apply them to additional assets. 



What source of inspiration do you take? Visualizations that you found on other websites or magazines (might be unrelated to your data).

We are inspired by the different datasets we found on Kaggle as well as the famous tweets of Elon Musk. Some visualizations that we found interesting are these following ones.  

[1] https://www.washingtonpost.com/opinions/2021/05/26/elon-musk-tweets-crypto-markets/

[2] https://www.cnbc.com/2021/01/29/elon-musks-tweets-are-moving-markets.html

[3] https://www.sec.gov/news/press-release/2018-219

[a] https://www.kaggle.com/code/stevenslater/elon-musk-crypto-analysis

[b] https://www.kaggle.com/code/hidelloon/dogecoin-and-dogefather-elon-musk

## Milestone 2 (Friday 6th May, 5pm)

**10% of the final grade**


## Milestone 3 (Friday 3rd June, 5pm)

**80% of the final grade**


## Late policy

- < 24h: 80% of the grade for the milestone
- < 48h: 70% of the grade for the milestone
