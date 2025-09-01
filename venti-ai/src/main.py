from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def root():
    return {"message": "🌬️ Venti AI service is running"}
