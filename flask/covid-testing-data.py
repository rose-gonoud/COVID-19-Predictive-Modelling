import requests
from config import covidAPI_KEY

url = "https://covid-19-statistics.p.rapidapi.com/reports"
querystring = {"region_province":"Alabama","iso":"USA","region_name":"US","city_name":"Autauga","date":"2020-04-16","q":"US Alabama"}
headers = {
    'x-rapidapi-host': "covid-19-statistics.p.rapidapi.com",
    'x-rapidapi-key': covidAPI_KEY
    }
response = requests.request("GET", url, headers=headers, params=querystring)

print(response.text)