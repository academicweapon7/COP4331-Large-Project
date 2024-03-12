import csv
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb+srv://RickL:COP4331@cluster0.l7iynfz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['Database']  # Replace 'mydatabase' with your database name
collection = db['Games']  # Replace 'mycollection' with your collection name

def read_csv_to_mongodb(csv_file, delimiter=','):
    # Try opening the CSV file with different encodings
    for encoding in ['utf-8', 'latin-1', 'utf-16']:
        try:
            # Open CSV file with the specified encoding
            with open(csv_file, 'r', encoding=encoding) as file:
                reader = csv.DictReader(file, delimiter=delimiter)

                # Iterate over each row in the CSV file
                for row in reader:
                    # Insert row into MongoDB collection
                    collection.insert_one(row)
                    
                # Exit the loop if successful
                break
        except UnicodeDecodeError:
            # If decoding fails, try the next encoding
            continue
        except Exception as e:
            print(f"Error: {e}")
            break
    else:
        print("Failed to open the CSV file with any encoding.")

if __name__ == "__main__":
    csv_file = 'data.csv'  # Specify the path to your CSV file
    read_csv_to_mongodb(csv_file)
