import streamlit as st
from openai import OpenAI

# --- Setup ---
st.set_page_config(page_title="EquiCoach", page_icon="🏠", layout="centered")
st.title("EquiCoach: AI Credit Readiness Assistant")
st.write("Get personalized insights on your readiness for homeownership.")

# --- Inputs ---
credit_score = st.number_input("Enter your credit score (300–850):", 300, 850, 650)
income = st.number_input("Enter your monthly income ($):", 0, 20000, 4000)
debt = st.number_input("Enter your total monthly debt ($):", 0, 20000, 1000)

# --- Basic Readiness Logic ---
if st.button("Check Readiness"):
    dti = (debt / income) * 100 if income > 0 else 0

    if credit_score < 580 or dti > 50:
        level = "Low"
        color = "red"
        advice = "Focus on improving your credit score and reducing debt before applying for a mortgage."
    elif credit_score < 700 or dti > 40:
        level = "Moderate"
        color = "orange"
        advice = "You’re getting close! Try lowering your debt-to-income ratio and make consistent on-time payments."
    else:
        level = "High"
        color = "green"
        advice = "You’re in a strong position for mortgage approval! Maintain low debt and steady income."

    # --- Progress Bar ---
    score_norm = (credit_score - 300) / 550
    readiness_score = min(max(score_norm * (1 - dti / 100), 0), 1)
    st.progress(readiness_score)
    
    # --- Output ---
    st.markdown(f"### ✅ Readiness Level: <span style='color:{color}'>{level}</span>", unsafe_allow_html=True)
    st.info(advice)

    # --- Optional AI Enhancement ---
    try:
        client = OpenAI(api_key="YOUR_API_KEY_HERE")  # Replace with your key
        prompt = f"""
        You are EquiCoach, a friendly financial readiness assistant.
        The user has a credit score of {credit_score}, a monthly income of ${income}, and monthly debt of ${debt}.
        Provide a short, motivating message (2–3 sentences) with one actionable financial step.
        """
        response = client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{"role": "user", "content": prompt}],
        )
        ai_message = response.choices[0].message.content
        st.success(ai_message)
    except Exception as e:
        st.write("💡 (Add your OpenAI key to enable AI advice.)")

st.caption("Built by Joanna Johnson for the NSBE AI in Action Hackathon 🖤")
