from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class MachineContext(BaseModel):
    machine_type: str
    model: Optional[str] = None
    age_years: Optional[float] = None
    last_maintenance_date: Optional[str] = None
    operating_hours: Optional[float] = None

class QueryRequest(BaseModel):
    query: str
    machine_context: MachineContext
    fault_type: Optional[str] = None

class DiagnosticStep(BaseModel):
    step_id: int
    instruction: str
    step_type: Optional[str] = "inspection" # safety, inspection, repair, test, report
    image_url: Optional[str] = None

class KnowledgeSource(BaseModel):
    title: str
    type: str # Technical Manual, Case Study, Standard, Incident Log
    excerpt: str
    page: Optional[str] = None
    source_id: Optional[str] = None
    file_url: Optional[str] = None

class QueryResponse(BaseModel):
    issue_summary: str
    possible_causes: List[Dict[str, Any]] # {"cause": str, "probability": float}
    diagnostic_steps: List[DiagnosticStep]
    corrective_actions: List[str]
    safety_warnings: List[str]
    confidence_score: float # 0.0 to 1.0
    sources: List[str] # Simple list for backward compatibility
    knowledge_sources: List[KnowledgeSource] # Rich data for UI
    related_cases: List[str]
    historical_count: Optional[int] = 0
