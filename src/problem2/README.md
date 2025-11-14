# Currency Swap Form

A modern, beautiful currency swap application built with **Vite**, **React**, and **TypeScript**.

## ✨ Features

- 🎨 **Beautiful Modern UI** - Gradient background with smooth animations
- 🔄 **Real-time Exchange Rates** - Live calculation based on token prices
- 🔍 **Token Search** - Quick search functionality for finding tokens
- 💱 **Instant Swap** - Quick token swapping with arrow button
- ✅ **Input Validation** - Smart validation with helpful error messages
- 💰 **USD Value Display** - Shows equivalent USD value for both tokens
- 📱 **Responsive Design** - Works perfectly on all screen sizes
- 🖼️ **Token Icons** - Displays token icons from Switcheo repository
- ⚡ **Fast Performance** - Built with Vite for lightning-fast development

## 🚀 Getting Started

### Application
- Running on: `code99-challenge.vercel.app`

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the problem2 directory:
```bash
cd src/problem2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit the URL shown in the terminal (usually `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 🎯 How to Use

1. **Select Source Token**: Click on the first token selector to choose which token you want to swap from
2. **Enter Amount**: Type the amount you want to swap in the "You pay" field
3. **Select Destination Token**: Click on the second token selector to choose which token you want to receive
4. **View Exchange Rate**: The app automatically calculates and displays the exchange rate and amount you'll receive
5. **Swap Tokens**: Click the arrow button in the middle to quickly swap the source and destination tokens
6. **Confirm Swap**: Click the "Confirm Swap" button to execute the swap

## 🛠️ Tech Stack

- **Vite** - Next generation frontend tooling
- **React 18** - UI library
- **TypeScript** - Type-safe JavaScript
- **CSS3** - Modern styling with animations

## 📦 Project Structure

```
src/problem2/
├── src/
│   ├── components/
│   │   ├── SwapForm.tsx        # Main swap form component
│   │   ├── SwapForm.css        # Swap form styles
│   │   ├── TokenSelector.tsx   # Token selection dropdown
│   │   └── TokenSelector.css   # Token selector styles
│   ├── App.tsx                 # Root component
│   ├── App.css                 # App-level styles
│   ├── main.tsx                # Entry point
│   ├── index.css               # Global styles
│   └── types.ts                # TypeScript type definitions
├── index-new.html              # HTML template
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Design Highlights

- **Gradient Background**: Beautiful purple gradient with animated dot pattern
- **Card-based Layout**: Clean, focused swap interface in a modern card
- **Smooth Animations**: Slide-up, fade-in, and hover effects throughout
- **Interactive Elements**: Hover states, active states, and visual feedback
- **Color Scheme**: Professional purple theme with excellent contrast
- **Typography**: Clear hierarchy with multiple font weights

## 🔧 API Integration

- **Price Data**: Fetches from `https://interview.switcheo.com/prices.json`
- **Token Icons**: Loads from `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/`
- **Error Handling**: Graceful fallbacks for missing icons and API errors

## 🌟 Key Features Implementation

### Input Validation
- Only allows numeric input with decimals
- Validates positive amounts
- Checks for token selection
- Real-time error messages

### Exchange Rate Calculation
- Automatically calculates conversion rates
- Displays both token amount and USD equivalent
- Updates in real-time as you type

### Token Selection
- Searchable dropdown with all available tokens
- Displays token icons and current prices
- Prevents selecting the same token twice
- Smooth animations and transitions

### User Experience
- Loading state while fetching prices
- Success feedback on swap confirmation
- Intuitive swap button to reverse direction
- Responsive design for all devices

## 📝 Notes

- The application uses the latest token prices from the Switcheo API
- Tokens without valid prices are automatically filtered out
- The swap is simulated with visual feedback (no actual blockchain transaction)
- All calculations are done client-side for instant feedback

## 🎓 Learning Outcomes

This project demonstrates:
- Modern React patterns with hooks
- TypeScript for type safety
- Vite for fast development
- API integration and data fetching
- Component composition and reusability
- CSS animations and transitions
- Responsive design principles
- User input validation
- Error handling and loading states

Enjoy swapping! 🚀

