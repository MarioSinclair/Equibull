from google import genai
from google.genai import types

client = genai.Client(api_key="AIzaSyDJpHyajlmyUa6JW02jr4mMhJWSPPfAtlg")

system_prompt = (
    "You are a knowledgeable, friendly financial assistant focused on helping "
    "first-time homebuyers. Provide clear, realistic explanations about "
    "credit scores, loan options, down payments, budgeting, and other "
    "homeownership topics. Use practical examples and numbers where helpful. "
    "Explain concepts in simple terms for beginners. Do not give personal financial advice; "
    "your guidance is educational."
)

chat = client.chats.create(
    model="gemini-2.5-flash",
    config=types.GenerateContentConfig(
        system_instruction= "You are a knowledgeable, friendly financial assistant focused on helping "
                            "first-time homebuyers. Provide clear, realistic explanations about "
                            "credit scores, loan options, down payments, budgeting, and other "
                            "homeownership topics. Use practical examples and numbers where helpful. "
                            "Explain concepts in simple terms for beginners. Do not give personal financial advice; "
                            "your guidance is educational."
)
)

print("Welcome to EquillBull's interactive chatbox! Type \"quit\" to exit")

while True:
  user_input = input("You: ")
  if user_input.lower() in ["quit", "exit"]:
    break

  if not user_input:
        continue
  try:
    response = chat.send_message(
        user_input,
        config=types.GenerateContentConfig(
            thinking_config=types.ThinkingConfig(thinking_budget=0) 
        ),
    )
    print(response.text)

  except Exception as e:
      print("Error:", e, "\n")