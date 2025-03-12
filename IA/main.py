# use my model.pkl with photos to get the result

import pickle
from transformers import AutoImageProcessor
from PIL import Image
import torch
import sys
import os

# Obtenir le chemin absolu du répertoire courant
current_dir = os.path.dirname(os.path.abspath(__file__))

# Charger le modèle à partir du fichier pickle
model_path = os.path.join(current_dir, 'model.pkl')
with open(model_path, 'rb') as f:
    model = pickle.load(f)

# Charger le processeur à partir du fichier pickle
processor_path = os.path.join(current_dir, 'processor.pkl')
with open(processor_path, 'rb') as f:
    processor = pickle.load(f)

# Dictionnaire des labels
id2label = {
    0: 'anger',
    1: 'disgust',
    2: 'fear',
    3: 'happy',
    4: 'neutral',
    5: 'sad',
    6: 'surprise'
}

# Chemin de l'image à tester
image_path = sys.argv[1]

# Charger et convertir l'image en PIL
pil_image = Image.open(image_path).convert("RGB")

# Prétraiter l'image
inputs = processor(images=pil_image, return_tensors="pt")

# Effectuer l'inférence
with torch.no_grad():
    outputs = model(**inputs)

# Obtenir la classe prédite
logits = outputs.logits
predicted_class_idx = logits.argmax(-1).item()
predicted_label = id2label[predicted_class_idx]

# Afficher le résultat
print(predicted_label)

