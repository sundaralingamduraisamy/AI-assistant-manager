from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import os
import glob

def ingest_documents(data_dir: str, index_path: str = "faiss_index"):
    """
    Ingest PDFs from data_dir and save a FAISS index.
    """
    documents = []
    
    # Check for PDF files
    pdf_files = glob.glob(os.path.join(data_dir, "*.pdf"))
    if not pdf_files:
        print(f"No PDFs found in {data_dir}. Skipping ingestion.")
        return False

    print(f"Found {len(pdf_files)} PDFs. Loading...")
    
    for pdf_file in pdf_files:
        try:
            loader = PyPDFLoader(pdf_file)
            docs = loader.load()
            documents.extend(docs)
            print(f"Loaded {pdf_file} ({len(docs)} pages)")
        except Exception as e:
            print(f"Error loading {pdf_file}: {e}")

    if not documents:
        return False

    # Split documents
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
    splits = text_splitter.split_documents(documents)
    print(f"Created {len(splits)} chunks.")

    # Create Embeddings and Vector Store
    # Using a small, fast local model appropriate for CPU
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    
    vector_store = FAISS.from_documents(splits, embeddings)
    
    # Save index
    vector_store.save_local(index_path)
    print(f"Vector store saved to {index_path}")
    return True

if __name__ == "__main__":
    # Run standalone
    current_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(current_dir, "data")
    ingest_documents(data_dir)
