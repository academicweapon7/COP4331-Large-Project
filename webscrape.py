import requests
import json
import urllib.request
import os
import csv
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://RickL:COP4331@cluster0.l7iynfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['Database']  # Replace 'mydatabase' with your database name
collection = db['Games']  # Replace 'mycollection' with your collection name

# Google Custom Search JSON API
# DO NOT MAKE MORE THAN 100 REQUEST IN A DAY
cse_id = "058b8832640884a3d"
api_key = "AIzaSyDeugBj9NGMmu3nA1Fc1dYEJJvnWkWQB-o"

csv_file = "data.csv"
try:
    # Open CSV file
    with open(csv_file, 'r', encoding='utf-8-sig') as file:
        reader = csv.DictReader(file, delimiter=',')

        # Iterate over each row in the CSV file
        for row in reader:
            search = row['title']
            url = f"https://www.googleapis.com/customsearch/v1?q={search} game 1920x1080&num=1&start=1&imgSize=huge&searchType=image&key={api_key}&cx={cse_id}"
            response = requests.get(url)
            response.raise_for_status()
            search_results = response.json()
            image_url = search_results['items'][0]['link']
            
            # Round 'peakPlayerCount' to the nearest 10,000
            peak_player_count = int(row['peakPlayerCount'].replace(',', ''))
            rounded_peak_player_count = round(peak_player_count / 10000) * 10000
            
            # Add rounded 'peakPlayerCount' and 'image_url' to the row
            row['peakPlayerCount'] = rounded_peak_player_count
            row['image_url'] = image_url
            
            print(row)
            
            # Insert row into MongoDB collection
            collection.insert_one(row)
except Exception as e:
    print(f"Error: {e}")