# Run Mushroom Model on 1.png
# Load the saved model and run a prediction on the image at the project root.

import json
import numpy as np
from PIL import Image
import tensorflow as tf
import keras

print("TensorFlow:", tf.__version__)
print("Keras:", keras.__version__)

# Load class names
with open("mushroom_names.json", "r") as f:
    data = json.load(f)
    class_names = data["mushroom_classes"]

# Load model
model = keras.models.load_model("mushroom_model.keras")

# Load and preprocess image
img = Image.open("1.png").convert("RGB").resize((128, 128))
arr = np.array(img)
arr = np.expand_dims(arr, axis=0)

# Predict
preds = model.predict(arr)
idx = int(np.argmax(preds[0]))
label = class_names[idx]
confidence = float(preds[0][idx])

print("Predicted class:", label)
print("Confidence:", confidence)
