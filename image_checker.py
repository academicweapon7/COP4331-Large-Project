from pymongo import MongoClient
import requests
from PIL import Image
from io import BytesIO
import tkinter as tk

class ImageDisplay:
    def __init__(self, image_links):
        self.image_links = image_links
        self.index = 0
        
        self.root = tk.Tk()
        self.root.title("Image Viewer")
        
        self.canvas = tk.Canvas(self.root, width=500, height=500)
        self.canvas.pack()
        
        self.display_image()
        
        self.root.bind("<Right>", self.next_image)
        self.root.bind("<Left>", self.prev_image)
        
        self.root.mainloop()
        
    def display_image(self):
        link = self.image_links[self.index]
        response = requests.get(link)
        image = Image.open(BytesIO(response.content))
        self.image = image.resize((500, 500), Image.ANTIALIAS)
        self.photo = ImageTk.PhotoImage(self.image)
        self.canvas.create_image(0, 0, anchor=tk.NW, image=self.photo)
        
    def next_image(self, event):
        self.index = (self.index + 1) % len(self.image_links)
        self.canvas.delete("all")
        self.display_image()
        
    def prev_image(self, event):
        self.index = (self.index - 1) % len(self.image_links)
        self.canvas.delete("all")
        self.display_image()

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['mydatabase']
collection = db['mycollection']

# Retrieve image links from MongoDB collection
image_links = [doc['image_link'] for doc in collection.find()]

# Display images one by one
if image_links:
    ImageDisplay(image_links)
else:
    print("No images found in the database.")
