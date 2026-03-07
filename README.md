# 🐍 JS Snake Game
A responsive **HTML5 Canvas Snake Game** built with **JavaScript**, designed to work smoothly on desktop and mobile devices. The game features swipe controls for mobile, keyboard controls for desktop, a pause/play system, and increasing difficulty levels.

## 🎮 Live Demo
Play it here:
[Live Snake Game](https://rytvee.github.io/js-snake-game/)

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

### Mobile
| Gesture              | Action            |
| ---------------------| ----------------- |
| **Swipe Up**         | Move Up.          |
| **Swipe Down**       | Move Down.        |
| **Swipe Left**       | Move Left.        |
| **Swipe Right**      | Move Right.       |

##  🧩 Game Mechanics
- The snake grows each time it eats food.
- Every 5 points increases the level.
- Each level increases the game speed.
- The game ends if:
  - The snake hits a wall
  - The snake collides with itself
- If the snake reaches maximum speed, the player wins.

## 🛠 Technologies Used
- - ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## Mobile Optimization
The game includes several improvements for mobile gameplay:
- Swipe detection
- Prevention of browser pull-to-refresh
- Touch tap detection
- Responsive canvas scaling

## 📂 Folder Structure
```text
tic-tac-toe/
│── index.html        # Main game layout
│── style.css         # Styling for the game board & UI
│── game.js           # Game logic
│── images/           # Icon
└── README.md         # README file
```

## 📜 License
This project is open for learning and free to use!
Feel free to modify, extend, or integrate it however you like.
