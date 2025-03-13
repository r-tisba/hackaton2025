import cv2
import time
import numpy as np
import torch
from transformers import ViTForImageClassification, ViTImageProcessor
import json
import os

# Load the Hugging Face model and image processor
model_name = 'motheecreator/vit-Facial-Expression-Recognition'
model = ViTForImageClassification.from_pretrained(model_name)
processor = ViTImageProcessor.from_pretrained(model_name)

# Define the emotion labels
emotion_labels = model.config.id2label

# Load the Haar cascade for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Start video capture from the webcam
video_capture = cv2.VideoCapture(0)

# 10-second timer
start_time = time.time()
duration = 10  # seconds

frame_count = 0

# Dictionary to count occurrences of each emotion
emotion_counts = {label: 0 for label in emotion_labels.values()}

while True:
    ret, frame = video_capture.read()
    if not ret:
        break

    frame_count += 1
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Face detection
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE
    )

    for (x, y, w, h) in faces:
        # Extract the face region
        roi_color = frame[y:y+h, x:x+w]
        # Convert to RGB
        roi_rgb = cv2.cvtColor(roi_color, cv2.COLOR_BGR2RGB)
        # Resize and preprocess the image
        inputs = processor(images=roi_rgb, return_tensors="pt")

        # Prediction
        with torch.no_grad():
            outputs = model(**inputs)
        logits = outputs.logits
        predicted_class_idx = logits.argmax(-1).item()
        label = emotion_labels[predicted_class_idx]
        confidence = torch.softmax(logits, -1)[0][predicted_class_idx].item()

        # Print the result for each image
        print(f"Image {frame_count}: {label} ({confidence * 100:.2f}%)")

        # Count the occurrence of the detected emotion
        emotion_counts[label] += 1

    # Stop after 10 seconds
    if time.time() - start_time > duration:
        print("Time elapsed, stopping the script.")
        break

video_capture.release()
cv2.destroyAllWindows()

# Calculate the top 3 detected emotions and their percentages
total_detections = sum(emotion_counts.values())
top_3_emotions = sorted(emotion_counts.items(), key=lambda x: x[1], reverse=True)[:3]
top_3_emotions = {emotion: (count / total_detections) * 100 for emotion, count in top_3_emotions}

# Display the final result
print("RESULT:", json.dumps(top_3_emotions))
