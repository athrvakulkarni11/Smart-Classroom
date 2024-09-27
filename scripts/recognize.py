import cv2
import imutils
import pickle
import numpy as np
import os
from flask import Flask, request, jsonify

app = Flask(__name__)

# Get the current directory of this script
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Preload models using paths relative to the script location
print('Loading models...')
protoPath = os.path.join(BASE_DIR, 'Models', 'deploy.prototxt')
modelPath = os.path.join(BASE_DIR, 'Models', 'res10_300x300_ssd_iter_140000.caffemodel')
embeddingModelPath = os.path.join(BASE_DIR, 'openface_nn4.small2.v1.t7')
recognizerPath = os.path.join(BASE_DIR, 'Outputs', 'recognizer.pickle')
lePath = os.path.join(BASE_DIR, 'Outputs', 'le.pickle')

# Load models
detector = cv2.dnn.readNetFromCaffe(protoPath, modelPath)
embedder = cv2.dnn.readNetFromTorch(embeddingModelPath)
recognizer = pickle.loads(open(recognizerPath, 'rb').read())
le = pickle.loads(open(lePath, 'rb').read())

@app.route('/recognize', methods=['POST'])
def recognize():
    data = request.get_json()
    imagePath = data.get('imagePath')

    # Construct absolute path using BASE_DIR to ensure it's correct
    absolute_image_path = os.path.join(BASE_DIR, '..', imagePath)
    print(f"Loading image from: {absolute_image_path}")

    image = cv2.imread(absolute_image_path)
    if image is None:
        print(f"Failed to load image from {absolute_image_path}")
        return jsonify({"message": f"Image does not exist at {absolute_image_path}"}), 400

    image = imutils.resize(image, width=600)
    (h, w) = image.shape[:2]

    imageBlob = cv2.dnn.blobFromImage(
        cv2.resize(image, (300, 300)), 1.0, (300, 300),
        (104.0, 177.0, 123.0), swapRB=False, crop=False)

    detector.setInput(imageBlob)
    detections = detector.forward()

    for i in range(0, detections.shape[2]):
        confidence = detections[0, 0, i, 2]

        if confidence > 0.5:
            box = detections[0, 0, i, 3:7] * np.array([w, h, w, h])
            (startX, startY, endX, endY) = box.astype('int')

            face = image[startY:endY, startX:endX]
            (fH, fW) = face.shape[:2]

            if fW < 20 or fH < 20:
                continue

            faceBlob = cv2.dnn.blobFromImage(face, 1.0 / 255, (96, 96), (0, 0, 0), swapRB=True, crop=False)
            embedder.setInput(faceBlob)
            vec = embedder.forward()

            preds = recognizer.predict_proba(vec)[0]
            j = np.argmax(preds)
            proba = preds[j]
            name = le.classes_[j]

            return jsonify({"message": f"Detected {name} with probability {proba * 100:.2f}%"})

    return jsonify({"message": "No face detected"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
