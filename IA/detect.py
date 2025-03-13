import cv2
import mediapipe as mp
import time

# Initialisation de Mediapipe Face Detection
mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils

# Capture vidéo
cap = cv2.VideoCapture(0)  # 0 pour la webcam
face_detection = mp_face_detection.FaceDetection(min_detection_confidence=0.5)

frame_count = 0
screenshot_interval = 30  # Capture une image toutes les 30 frames
start_time = time.time()
max_duration = 10  # Arrêt après 10 secondes

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
    
    # Conversion de l'image en RGB (Mediapipe utilise le format RGB)
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    
    # Détection des visages
    results = face_detection.process(rgb_frame)
    
    # Dessiner les boîtes autour des visages détectés
    if results.detections:
        for detection in results.detections:
            mp_drawing.draw_detection(frame, detection)
        
        # Sauvegarde du screenshot lorsqu'un visage est détecté
        if frame_count % screenshot_interval == 0:
            timestamp = int(time.time())
            screenshot_path = f"screenshot_{timestamp}.png"
            cv2.imwrite(screenshot_path, frame)
            print(f"Screenshot enregistré: {screenshot_path}")
    
    # Affichage des frames en temps réel
    cv2.imshow("Face Detection", frame)
    
    # Quitter avec la touche 'q' ou arrêt automatique après 10 secondes
    if cv2.waitKey(1) & 0xFF == ord('q') or (time.time() - start_time) > max_duration:
        break
    
    frame_count += 1

cap.release()
cv2.destroyAllWindows()

# Librairies à installer dans l'environnement virtuel Python
# Installation via pip :
# pip install opencv-python mediapipe
