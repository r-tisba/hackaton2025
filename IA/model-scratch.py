import cv2
import time
import numpy as np
import tensorflow as tf
import json
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
# Charger le modèle entraîné
model = tf.keras.models.load_model(os.path.join(current_dir, "scratch_d2_63_nb.h5"))

# Définir manuellement le mapping des indices aux étiquettes
emotion_labels = {
    0: 'angry',
    1: 'fear',
    2: 'happy',
    3: 'neutral',
    4: 'sad',
    5: 'surprise'
}

# Charger le classifieur Haar pour la détection de visage
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')

# Démarrer la capture vidéo depuis la webcam
video_capture = cv2.VideoCapture(0)

# Chronomètre de 10 secondes
start_time = time.time()
duration = 10  # secondes

frame_count = 0

# Dictionnaire pour compter les occurrences de chaque sentiment
emotion_counts = {label: 0 for label in emotion_labels.values()}

while True:
    ret, frame = video_capture.read()
    if not ret:
        break

    frame_count += 1
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Détection des visages
    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=5,
        minSize=(30, 30),
        flags=cv2.CASCADE_SCALE_IMAGE
    )

    for (x, y, w, h) in faces:
        # Extraction de la région du visage
        roi_gray = gray[y:y+h, x:x+w]
        # Redimensionner à 64x64 pixels (adapter à la taille d'entrée du modèle)
        roi_resized = cv2.resize(roi_gray, (64, 64))
        # Normaliser les valeurs des pixels
        roi_normalized = roi_resized.astype("float32") / 255.0
        # Ajouter les dimensions nécessaires pour le modèle (batch et canal)
        roi_input = np.expand_dims(roi_normalized, axis=0)
        roi_input = np.expand_dims(roi_input, axis=-1)

        # Prédiction de l'émotion
        prediction = model.predict(roi_input)
        emotion_idx = np.argmax(prediction)
        label = emotion_labels[emotion_idx]
        confidence = prediction[0][emotion_idx]

        # Imprimer le résultat pour chaque image
        print(f"Image {frame_count}: {label} ({confidence * 100:.2f}%)")

        # Compter l'occurrence du sentiment détecté
        emotion_counts[label] += 1

    # Arrêt après 10 secondes
    if time.time() - start_time > duration:
        print("Temps écoulé, arrêt du script.")
        break

video_capture.release()
cv2.destroyAllWindows()

# Calculer les 3 sentiments les plus détectés et leurs pourcentages
total_detections = sum(emotion_counts.values())
top_3_emotions = sorted(emotion_counts.items(), key=lambda x: x[1], reverse=True)[:3]
top_3_emotions = {emotion: (count / total_detections) * 100 for emotion, count in top_3_emotions}

# Afficher le résultat final
print("RESULT:", json.dumps(top_3_emotions))