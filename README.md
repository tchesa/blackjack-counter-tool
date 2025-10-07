# 🃏 Blackjack Counter Tool

A modern, keyboard-driven web application for practicing card counting using the Hi-Lo system. Perfect for blackjack enthusiasts looking to sharpen their counting skills or track counts during practice sessions.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19.1.1-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-3178c6.svg)

## 🎯 Features

- **Running Count & True Count Tracking**: Automatically calculates both running count and true count based on cards played
- **Keyboard Shortcuts**: Lightning-fast counting with intuitive keyboard controls (Q, W, E, R, Space)
- **Visual Feedback**: Color-coded displays showing positive (green) and negative (red) counts
- **Card Distribution Visualization**: Real-time progress bar showing the ratio of small, neutral, and large cards played
- **Deck Configuration**: Support for any number of decks (commonly 6 or 8 in casinos)
- **Persistent Settings**: Your deck configuration is saved locally and restored on next visit
- **Undo Functionality**: Easily correct mistakes with the undo feature
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🎮 How to Use

### Card Counting System (Hi-Lo)

The Hi-Lo card counting system assigns values to cards:

- **Small cards (2-6)**: +1 to the count
- **Neutral cards (7-9)**: 0 (but tracked for true count calculation)
- **Large cards (10, J, Q, K, A)**: -1 to the count

### Keyboard Shortcuts

| Key     | Action   | Description                                     |
| ------- | -------- | ----------------------------------------------- |
| `Q`     | +1 Count | Press when you see small cards (2-6)            |
| `W`     | Neutral  | Press when you see neutral cards (7-9)          |
| `E`     | -1 Count | Press when you see large cards (10, J, Q, K, A) |
| `R`     | Undo     | Undo the last counting action                   |
| `Space` | Reset    | Reset all counters (use when shoe is replaced)  |

### Getting Started

1. **Set the number of decks** in the shoe (typically 6 or 8 decks in casinos)
2. **Start counting** using the keyboard shortcuts as cards are revealed
3. **Track the true count** which divides the running count by remaining decks
4. **Reset when the shoe is replaced** to start a fresh count

## 🚀 Running Locally

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tchesa/blackjack-counter-tool.git
cd blackjack-counter-tool
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot module replacement
- `npm run build` - Build for production (output in `dist/` folder)
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview production build locally

## 🛠️ Built With

- **[React 19](https://react.dev/)** - UI framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Vite](https://vite.dev/)** - Fast build tool and dev server
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[PostHog](https://posthog.com/)** - Product analytics

## 📱 Live Demo

Check out the live application: [Blackjack Counter Tool](https://tchesa.github.io/blackjack-counter-tool/)

## 🎓 Understanding True Count

The **true count** is calculated by dividing the running count by the number of decks remaining:

```
True Count = Running Count / Decks Remaining
```

This metric is more accurate than the running count because it accounts for how many cards are left in the shoe. A true count of +2 with one deck remaining is more advantageous than a true count of +2 with five decks remaining.

## ⚠️ Disclaimer

This tool is for **educational and practice purposes only**. Card counting is a skill that requires practice and is not illegal, but casinos reserve the right to refuse service to players they suspect of counting cards. Always gamble responsibly.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**tchesa**

- GitHub: [@tchesa](https://github.com/tchesa)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/tchesa/blackjack-counter-tool/issues).

---

Made with ♠️♥️♣️♦️ by tchesa
