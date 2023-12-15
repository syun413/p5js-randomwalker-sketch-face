import cv2
import numpy as np
import matplotlib.pyplot as plt

# Load the grayscale image
image_path = '/mnt/data/teacher_grayscale.png'
image = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

# Perform Canny edge detection
edges = cv2.Canny(image, threshold1=50, threshold2=150)

# Save the result
output_path = '/mnt/data/teacher_edges.png'
cv2.imwrite(output_path, edges)

# Display the result
plt.imshow(edges, cmap='gray')
plt.axis('off')  # Hide the axis labels
plt.show()