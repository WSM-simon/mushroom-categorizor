# Mushroom Classifier

An AI-powered mushroom species identification application combining a FastAPI backend with a Next.js frontend.

## Features

- 🍄 Upload mushroom images (JPG/PNG)
- 🤖 AI-powered species classification
- 📊 Top-N predictions with confidence scores
- 🎨 Modern, responsive UI with Tailwind CSS
- ⚡ Fast inference with TensorFlow/Keras

## Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **TensorFlow/Keras** - Deep learning model
- **Uvicorn** - ASGI server

### Frontend
- **Next.js 13** - React framework
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives

## Getting Started

### Prerequisites

- Python 3.8+
- Node.js 16+
- npm or pnpm

### Installation

#### 1. Install Node.js dependencies:
```bash
npm install
# or
pnpm install
```

#### 2. Set up Python virtual environment and install dependencies:

**Option A: Using the setup script (recommended for macOS/Linux):**
```bash
./setup-python.sh
source venv/bin/activate
```

**Option B: Manual setup:**
```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

> **Note for macOS users with Homebrew:** If you see an "externally-managed-environment" error, you must use a virtual environment (as shown above). This is required by PEP 668 to prevent breaking system packages.

### Running the Application

**Important:** Make sure your Python virtual environment is activated before running the dev server:
```bash
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate  # On Windows
```

**Development mode (runs both backend and frontend):**
```bash
npm run dev
# or
pnpm dev
```

This will start:
- FastAPI backend on http://localhost:8000
- Next.js frontend on http://localhost:3000

**Run frontend only (without backend):**
```bash
npm run dev:next-only
# or
pnpm dev:next-only
```

**Run backend only:**
```bash
# Make sure venv is activated first!
source venv/bin/activate
npm run fastapi-dev
# or
uvicorn backend:app --reload --port 8000
```

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
mushroom-classifier/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # React components
│   └── ui/               # UI components (Button, Card, etc.)
├── lib/                  # Utility functions
├── public/               # Static assets
├── backend.py            # FastAPI backend
├── mushroom_model.keras  # Trained model
├── mushroom_names.json   # Class names
├── package.json          # Node.js dependencies
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS config
└── tsconfig.json         # TypeScript config
```

## API Endpoints

### POST `/api/predict`
Classify a mushroom image.

**Parameters:**
- `image` (file): JPG or PNG image file
- `n` (int): Number of top predictions (1-20, default: 3)

**Response:**
```json
{
  "top_n": [
    {"name": "fleecy_milkcap", "confidence": 0.85},
    {"name": "common_inkcap", "confidence": 0.10}
  ]
}
```

### GET `/api/health`
Health check endpoint.

### GET `/api/docs`
FastAPI auto-generated Swagger documentation.

## Configuration

### Backend (backend.py)
- `MODEL_PATH`: Path to Keras model file
- `NAMES_PATH`: Path to class names JSON file
- `IMAGE_SIZE`: Input image dimensions (128×128)
- `MAX_TOP_N`: Maximum number of predictions

### Frontend (next.config.js)
- API rewrites for development/production
- Proxy configuration for FastAPI

## Development

The application uses concurrently to run both servers in development mode. The Next.js config includes rewrites that proxy API requests to the FastAPI backend:

- Development: `http://localhost:3000/api/*` → `http://localhost:8000/*`
- Production: API routes handled by serverless functions

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Add Python runtime support via `api/` directory

### Docker

```bash
docker build -t mushroom-classifier .
docker run -p 3000:3000 -p 8000:8000 mushroom-classifier
```

## Safety Warning

⚠️ **This is an AI model and may not be 100% accurate. Never consume mushrooms based solely on this identification. Always consult with a mycology expert before consuming wild mushrooms.**

## License

This project is part of the [mushroom-categorizor-model](https://github.com/WSM-simon/mushroom-categorizor-model) repository.
