import google.generativeai as palm
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import pandas as pd
import joblib
import math
# Load the Ridge Regression model and PolynomialFeatures instance from the h5 file
loaded_data = joblib.load('ridge_model_and_poly_features.h5')
loaded_ridge_model = loaded_data['ridge_model']
poly_features = loaded_data['poly_features']
app = FastAPI()


# Configure the API key
palm.configure(api_key='AIzaSyAGeAIOgmRyusKhWf9qfU0um2ZiN1Na8sY')

# List available models and choose one
model = "models/text-bison-001"
print(model)


origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


class Numbers(BaseModel):
    values: List[int]


class Numbers2(BaseModel):
    values: str


@app.post("/prediction/")
async def calculate_sum(numbers: Numbers):
    if len(numbers.values) != 5:
        raise HTTPException(
            status_code=400, detail="Exactly five values are required.")

    result = list(numbers.values)
    new_sample = pd.DataFrame({
        "Frontend": [result[0]],
        "Backend": [result[1]],
        "ML/MLOps": [result[2]],
        "QA": [result[3]],
        "Rank": [result[4]]
    }, index=[0])
    new_sample_poly = poly_features.transform(new_sample)
    predicted_duration_loaded = loaded_ridge_model.predict(new_sample_poly)
    return {"prediction": math.ceil(predicted_duration_loaded[0])}
