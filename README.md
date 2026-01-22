# 🎓 S5 Semester Average Calculator

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1.3-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff69b4?style=for-the-badge&logo=framer)

A beautiful, responsive, and intuitive grade calculator for USTHB S5 Computer Science students.

[View Demo](#) · [Report Bug](#) · [Request Feature](#)

</div>

---

## ✨ Features

- 📊 **Real-time Calculations** — Watch your averages update instantly as you type
- 🎨 **Beautiful UI** — Modern design with smooth animations and gradients
- 📱 **Fully Responsive** — Works perfectly on desktop, tablet, and mobile
- ⚡ **Lightning Fast** — Built with Next.js 16 and Turbopack
- 💾 **Export Data** — Download your grades as JSON for backup
- 🔄 **Reset Functionality** — Clear all grades with one click
- 🌟 **Weighted Averages** — Automatically calculates using correct coefficients

## 📚 Supported Modules

| Module | Coefficient | Calculation Formula |
|--------|-------------|---------------------|
| Network | 3 | TP × 0.4 + Exam × 0.6 |
| Operating System 2 | 3 | ((TP + TD) ÷ 2) × 0.4 + Exam × 0.6 |
| Compilation | 3 | ((TP + TD) ÷ 2) × 0.4 + Exam × 0.6 |
| Software Engineering | 3 | TD × 0.4 + Exam × 0.6 |
| Graph Theory | 3 | TD × 0.4 + Exam × 0.6 |
| Information Extraction | 2 | Exam only |
| English 3 | 2 | Exam only |

**Total Coefficient: 19**

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/) 1.0+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/romy-dev-hub/s5-average-calculator.git
   cd s5-average-calculator
   ```

2. Install dependencies
   ```bash
   bun install
   # or
   npm install
   ```

3. Run the development server
   ```bash
   bun run dev
   # or
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Package Manager:** [Bun](https://bun.sh/)

## 📁 Project Structure

```
s5-average-calculator/
├── app/
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Main calculator page
├── components/
│   ├── AboutCreatorModal.tsx   # About modal with creator info
│   ├── AnimatedNumber.tsx      # Smooth number animations
│   ├── AverageDisplay.tsx      # Average display component
│   ├── ModuleCard.tsx          # Individual module input card
│   └── ResultsPanel.tsx        # Results summary panel
├── data/
│   └── modules.ts       # Module configurations
├── types/
│   └── index.ts         # TypeScript interfaces
├── utils/
│   └── calculations.ts  # Grade calculation logic
└── public/
    ├── cover.gif        # Creator cover image
    ├── me.jpg           # Creator photo
    └── icon.svg         # Favicon
```

## 🧮 Calculation Methods

The calculator uses the official USTHB grading formulas:

```typescript
// Network: TP × 0.4 + Exam × 0.6
// OS2 & Compilation: ((TP + TD) / 2) × 0.4 + Exam × 0.6
// SE & Graph Theory: TD × 0.4 + Exam × 0.6
// Info Extraction & English: Exam only

// Weighted Average = Σ(Module Average × Coefficient) / Σ(Coefficients)
```

## 👨‍💻 Author

<div align="center">
  <img src="public/me.jpg" alt="小罗" width="100" style="border-radius: 50%"/>
  
  **小罗**
  
  Computer Science Student @ USTHB
  
  *Building tools to make academic life easier* ✨
</div>

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- USTHB Computer Science Department for the grading system
- All S5 students who inspired this project
- The amazing open-source community

---

<div align="center">
  Made with ❤️ by 小罗 for USTHB S5 Students
  
  ⭐ Star this repo if you found it helpful!
</div>
