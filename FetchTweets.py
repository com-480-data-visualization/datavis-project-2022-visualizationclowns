import time
import requests
import json

base_url = "https://api.twitter.com/2/users/44196397/tweets?max_results=100&tweet.fields=public_metrics,created_at"

payload={}
headers = {
  'Authorization': '',
  'Cookie': 'guest_id=v1%3A164604633070910660'
}




with open('newTweets.json') as json_file:
    data = json.load(json_file)

index = 0
unique = 0
p_token_parameter = "&pagination_token="
p_token = None

while True:

  url = base_url
  if p_token is not None:
    url = base_url + p_token_parameter + p_token

  print(url)
  response = requests.request("GET", url, headers=headers, data=payload)
  resp = response.json()

  print(index)
  print(unique)

  time.sleep(5)
  if "meta" in resp:
    if "next_token" in resp["meta"]:
      if resp["meta"]["next_token"] != p_token:
        unique += 1
      p_token = resp["meta"]["next_token"]

  if "data" in resp:
    for tweet in resp["data"]:
      if tweet["id"] not in data:
        data[tweet["id"]] = tweet

  index += 1


  with open('newTweets.json', 'w') as outfile:
      json.dump(data, outfile)

