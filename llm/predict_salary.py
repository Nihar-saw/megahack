import joblib
import numpy as np

def predict_salary(role, scores_dict):
    try:
        model_file = {
            "data_scientist": "DS_salary_prediction.joblib",
            "web_developer": "web_dev_salary_prediction.joblib",
            "uiux_designer": "uiux_salary_prediction.joblib"
        }.get(role)

        model = joblib.load(model_file)
        
       
        score_values = list(scores_dict.values())
        input_data = np.array(score_values).reshape(1, -1)
        
        prediction = model.predict(input_data)
        return round(float(prediction[0]), 2)
    except Exception as e:
        print(f"Salary Model Error: {e}")
        return 0.0