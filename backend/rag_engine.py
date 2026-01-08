import os
import glob
from langchain_groq import ChatGroq
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import FAISS
from langchain_core.documents import Document
from langchain_core.prompts import ChatPromptTemplate
from models import QueryResponse, DiagnosticStep, KnowledgeSource
from typing import List, Dict, Any
import json

class RAGEngine:
    def __init__(self):
        self.api_key = os.getenv("GROQ_API_KEY")
        if not self.api_key:
            print("WARNING: GROQ_API_KEY not found in environment variables.")
        
        # Initialize Groq LLM (Llama 3 8b is fast and good)
        if self.api_key:
            self.llm = ChatGroq(temperature=0, groq_api_key=self.api_key, model_name="llama-3.3-70b-versatile")
        else:
            self.llm = None

        # Initialize Embeddings (Local)
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        
        self.vector_store_path = "faiss_index"
        self.vector_store = None
        self.load_vector_store()

    def load_vector_store(self):
        if os.path.exists(self.vector_store_path):
            try:
                self.vector_store = FAISS.load_local(self.vector_store_path, self.embeddings, allow_dangerous_deserialization=True)
                print("Vector store loaded successfully.")
            except Exception as e:
                print(f"Failed to load vector store: {e}")
        else:
            print("No vector store found. Run ingest.py first.")

    def retrieve(self, query: str, k: int = 3) -> List[Document]:
        if not self.vector_store:
            return []
        return self.vector_store.similarity_search(query, k=k)

    def generate_response(self, query: str, context: Dict[str, Any], retrieved_docs: List[Document]) -> QueryResponse:
        """
        Generate a structured response using Groq.
        """
        if not self.llm:
            return self._get_mock_response(query, context)

        # Construct the context string
        docs_content = "\n\n".join([f"Source: {os.path.basename(doc.metadata.get('source', 'Unknown'))}\nContent: {doc.page_content}" for doc in retrieved_docs])
        
        machine_info = f"Machine Type: {context.get('machine_type', 'Unknown')}, Model: {context.get('model', 'Unknown')}, Age: {context.get('age_years')} years"
        
        system_prompt = """You are an expert manufacturing maintenance assistant. 
        Analyze the machine context, user query, and retrieved technical documents to provide a precise diagnosis.
        
        Return ONLY valid JSON. Do not include any text before or after the JSON.
        The JSON must strictly follow this schema:
        {{
            "issue_summary": "One sentence summary (e.g., 'Excessive Vibration Detected in Motor Bearings').",
            "possible_causes": [{{"cause": "Cause Name", "probability": 0.8}}],
            "diagnostic_steps": [
                {{"step_id": 1, "instruction": "Step text", "step_type": "safety"}}
            ],
            "corrective_actions": ["Action 1"],
            "safety_warnings": ["Warning 1"],
            "confidence_score": 0.9,
            "sources": ["Filename.pdf"],
            "knowledge_sources": [
                {{
                    "title": "Document Title", 
                    "type": "Technical Manual", 
                    "excerpt": "Specific relevant text from doc", 
                    "page": "p. 45-50",
                    "file_url": "filename.pdf"
                }}
            ],
            "related_cases": ["Case #4829"],
            "historical_count": 2347
        }}
        Step Types must be: safety, inspection, repair, test, report.
        Knowledge Source Types: Technical Manual, Case Study, Standard, Incident Log.
        IMPORTANT: The "file_url" must be the exact filename (e.g., 'Induction_Motor_Maintenance_Manual.pdf') provided in the 'Source:' header of each technical reference below.
        """

        # Using invoke() with dictionary allows us to pass variables if defined in prompt,
        # but here we constructed the prompt string directly.
        # ChatPromptTemplate expects variables if using templates. 
        # Simpler approach: Use from_messages directly with strings if we formatted them already.
        
        # Format the strings first
        formatted_user_message = f"""
        Context: {machine_info}
        Problem: {query}
        
        Technical Reference Material:
        {docs_content}
        """
        
        prompt = ChatPromptTemplate.from_messages([("system", system_prompt), ("human", formatted_user_message)])
        chain = prompt | self.llm
        
        try:
            response_msg = chain.invoke({})
            content = response_msg.content
            # Clean up potential markdown code blocks
            content = content.replace("```json", "").replace("```", "").strip()
            data = json.loads(content)
            
            # Map to Pydantic model
            return QueryResponse(**data)
        except Exception as e:
            print(f"Error generating response: {e}")
            return self._get_mock_response(query, context, error_msg=str(e))

    def _get_mock_response(self, query, context, error_msg=None):
        # Fallback if specific failure
        summary = f"Analysis of {query} (Fallback Mode)"
        if error_msg:
            summary += f" - Error: {error_msg}"
        
        return QueryResponse(
            issue_summary=summary,
            possible_causes=[{"cause": "Unknown/Check Connection", "probability": 0.1}],
            diagnostic_steps=[DiagnosticStep(step_id=1, instruction="Check API Key connection", step_type="inspection")],
            corrective_actions=["Ensure Groq API Key is valid"],
            safety_warnings=["System running in fallback mode"],
            confidence_score=0.1,
            sources=[],
            knowledge_sources=[
                KnowledgeSource(
                    title="System Troubleshooting Guide",
                    type="Technical Manual",
                    excerpt="Connection lost or API error encountered during processing.",
                    page="App Error Log"
                )
            ],
            related_cases=[],
            historical_count=0
        )

rag_engine = RAGEngine()
