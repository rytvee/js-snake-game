# 🐍 JS Snake Game
A responsive **HTML5 Canvas Snake Game** built with **JavaScript**, designed to work smoothly on desktop and mobile devices. The game features swipe controls for mobile, keyboard controls for desktop, a pause/play system, and increasing difficulty levels.

## 🎮 Live Demo
Play it here:
[Live Snake Game](https://https://rytvee.github.io/js-snake-game/)

## ✨ Features
- 📱 Mobile Swipe Controls
- ⌨️ Keyboard Controls (Arrow Keys)
- ⏸ Pause / Play Button
- 🔁 Restart Button
- 📊 Score Tracking
- 🚀 Progressive Difficulty (Level System)
- 🎯 Random Food Spawning
- 🧠 Self Collision Detection
- 🧱 Wall Collision Detection
- 📐 Responsive Canvas Layout
- 👑 Win Condition when Maximum Speed is Reached

## 🕹 Controls
### Desktop
| Key                    | Action            |
| ---------------------- | ----------------- |
| **⬆ Arrow Up**         | Move Up.          |
| **⬇ Arrow Down**       | Move Down.        |
| **⬅ Arrow Left**      | Move Left.        |
| **➡ Arrow Right**     | Move Right.       |

## 📂 Folder Structure
```text
tic-tac-toe/
│── index.html        # Main game layout
│── style.css         # Styling for the game board & UI
│── game.js           # Game logic
│── sounds/           # music, sounds 
└── images/           # Icon, game play gif
```

##  📋 Overview

| Part                   | Role                                                                                          |
| ---------------------- | --------------------------------------------------------------------------------------------- |
| **Ball**               | Moves up/down & bounces off walls and paddle. Position updates using `requestAnimationFrame`. |
| **Paddle**             | Controlled by user (move left/right or up/down depending on implementation).                  |
| **Collision Logic**    | Detects overlap between ball and paddle or walls. Reverses direction upon impact.             |
| **Scoring**            | Tracks hits and keeps points.                                                                 |


## 🖥️ Gameplay

![Game Play](images/game-play.gif)

## 📜 License
This project is open for learning and free to use!
Feel free to modify, extend, or integrate it however you like.
