# AI-Assistant Manager: Vector-Based Retrieval for Requirement Traceability

This project is an AI-powered manufacturing maintenance assistant designed to help technicians retrieve information from technical manuals, case studies, and incident logs using semantic search (RAG - Retrieval-Augmented Generation).

## 🚀 Features
- **Semantic Search**: Uses FAISS and HuggingFace embeddings for precise technical document retrieval.
- **AI Diagnosis**: Leverages Groq (Llama 3) to generate maintenance instructions and safety warnings.
- **Traceability**: Links requirements directly to source documents with page numbers and excerpts.
- **Interactive UI**: A modern dashboard for machine monitoring and maintenance chat.

## 🛠️ Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide React.
- **Backend**: FastAPI, Python, LangChain, FAISS, Groq API.

---

## 📋 Prerequisites
- **Python 3.8+**
- **Node.js 16+**
- **Groq API Key** (Get one at [console.groq.com](https://console.groq.com/))

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/sundaralingamduraisamy/AI-assistant-manager.git
cd AI-assistant-manager
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   # Windows
   python -m venv venv
   .\venv\Scripts\activate

   # Mac/Linux
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Configure Environment Variables:
   - Create a file named `.env` in the `backend` folder.
   - Add your Groq API key:
     ```env
     GROQ_API_KEY=your_groq_api_key_here
     ```
5. (Optional) Ingest Documents:
   If you have new PDFs in `backend/data/`, run:
   ```bash
   python ingest.py
   ```
6. Start the Backend API:
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`.

### 3. Frontend Setup
1. Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

---

## 📁 Project Structure
- `backend/`: FastAPI server, RAG engine, and document ingestion logic.
- `frontend/`: React application with dashboard and chat interface.
- `data/`: Technical documents (PDFs) used for the search engine.
