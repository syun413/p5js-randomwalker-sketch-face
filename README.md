# p5.js Random Walker Sketch Face Project

## Project Overview
This project utilizes p5.js and the Random Walker algorithm to create sketches of human faces. It combines image processing techniques with creative coding to present digital art in a unique way. The project includes a face image processed with the Canny algorithm for edge detection and a p5.js script to generate these images.

## File Structure
- `teacher_edges.png` - Face image processed with the Canny algorithm for edge detection.
- `index.html` - HTML file to run the project in a web browser.
- `random_walker_grid.js` - JavaScript file implementing the main logic for the Random Walker.
- `canny_algorithm.py` - Python script to process the original image and extract edges.

## Installation & Usage Guide

### Prerequisites
- Ensure you have [Git](https://git-scm.com/) installed on your system.
- Install [Visual Studio Code](https://code.visualstudio.com/).
- Install the [Live Server Extension](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) in Visual Studio Code.

### Installation Steps
1. Clone the project to your local machine:
   ```bash
   git clone git@github.com:syun413/p5js-randomwalker-sketch-face.git
2. Open Visual Studio Code and navigate to the cloned project folder.
### Running the Project
In Visual Studio Code, click on the 'Live Preview' button at the bottom right corner.
The browser will automatically open and display the face image generated by the Random Walker.
### Usage
Once the project is running, you will see a face sketch generated by the Random Walker based on the teacher_edges.png file.
You can replace the teacher_edges.png file to experiment with different face images.