import pandas as pd
import random

# Define pavement anomalies
anomalies = ["pothole", "crack", "waterlogging", "uneven surface", "debris"]

# Read the CSV file
df = pd.read_csv("frontend/public/24_feb_location.csv")  # Replace with your actual filename

# Randomly assign anomalies, ensuring not every row has one
df["object"] = [random.choice(anomalies) if random.random() < 0.4 else "" for _ in range(len(df))]

# Save the modified CSV
df.to_csv("frontend/public/24_feb_location1.csv", index=False)

print("CSV file updated with random pavement anomalies.")