from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from models import QueryRequest, QueryResponse
from rag_engine import rag_engine

app = FastAPI(title="AI-Based Maintenance Assistant API")

# Serve PDF documents
app.mount("/docs", StaticFiles(directory="data"), name="docs")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For development, allow all
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/query", response_model=QueryResponse)
async def query_endpoint(request: QueryRequest):
    """
    Process a maintenance query using the RAG pipeline.
    """
    # 1. Retrieve relevant documents
    retrieved_docs = rag_engine.retrieve(request.query)
    
    # 2. Generate response using Gemini
    response = rag_engine.generate_response(
        query=request.query,
        context=request.machine_context.dict(),
        retrieved_docs=retrieved_docs
    )
    
    return response

