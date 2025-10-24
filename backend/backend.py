from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
import firebase_admin
from firebase_admin import credentials, auth
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize Firebase Admin SDK (optional for simple setup)
FIREBASE_ENABLED = False
service_account_path = os.getenv("FIREBASE_SERVICE_ACCOUNT_PATH", "firebase-service-account.json")

try:
    if os.path.exists(service_account_path):
        cred = credentials.Certificate(service_account_path)
        firebase_admin.initialize_app(cred)
        FIREBASE_ENABLED = True
except Exception as e:
    print(f"⚠️ Firebase Admin not configured - running in dev mode (no auth verification)")
    print(f"   Add service account JSON to enable full authentication")

app = FastAPI()

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite/React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Models
class UserRegistration(BaseModel):
    email: str
    password: str
    display_name: str = None

# Auth Middleware
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    
    try:
        token = credentials.credentials
        decoded_token = auth.verify_id_token(token)
        return decoded_token
    except Exception as e:
        raise HTTPException(status_code=401, detail=f"Invalid authentication: {str(e)}")

# Routes
@app.get("/")
async def root():
    return {"message": "EquiCoach API is running"}

@app.get("/user/profile")
async def get_user_profile(user=Depends(verify_token)):
    """Get authenticated user's profile"""
    try:
        user_record = auth.get_user(user['uid'])
        return {
            "uid": user_record.uid,
            "email": user_record.email,
            "display_name": user_record.display_name,
            "email_verified": user_record.email_verified
        }
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"User not found: {str(e)}")