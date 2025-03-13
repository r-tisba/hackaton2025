#test model of huggingface

# Load model directly
from transformers import AutoImageProcessor, AutoModelForImageClassification
import cv2
from PIL import Image
from transformers import AutoConfig
import torch

processor = AutoImageProcessor.from_pretrained("motheecreator/vit-Facial-Expression-Recognition")
model = AutoModelForImageClassification.from_pretrained("motheecreator/vit-Facial-Expression-Recognition")

# Load the configuration of the model
config = AutoConfig.from_pretrained("motheecreator/vit-Facial-Expression-Recognition")

# on affiche quel label corrspond a quoi 
# 
# {0: 'anger',
#  1: 'disgust',
#  2: 'fear',
#  3: 'happy',
#  4: 'neutral',
#  5: 'sad',
#  6: 'surprise'
# }
print(config.id2label)


# Initialize webcam
cap = cv2.VideoCapture(0)

while True:
    # Capture frame-by-frame
    ret, frame = cap.read()
    
    if not ret:
        break
    
    # Convert frame to PIL image
    pil_image = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
    
    # Preprocess the image
    inputs = processor(images=pil_image, return_tensors="pt")
    
    # Perform inference
    with torch.no_grad():
        outputs = model(**inputs)
    
    # Get the predicted class
    logits = outputs.logits
    predicted_class_idx = logits.argmax(-1).item()
    
    # Display the resulting frame
    cv2.putText(frame, f'Class: {predicted_class_idx}', (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2, cv2.LINE_AA)
    cv2.imshow('Webcam', frame)


    
    # Break the loop on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()

#save the model in pickle file
import pickle

with open('model.pkl', 'wb') as f:
    pickle.dump(model, f)

# Sauvegarder le processor
with open('processor.pkl', 'wb') as f:
    pickle.dump(processor, f)

