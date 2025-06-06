import sys
import json
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Load data from stdin
data = json.load(sys.stdin)

receiver_email = data.get("to")
subject = data.get("subject", "No Subject")
message_body = data.get("message", "")
sender_email = "ea442@njit.edu"  # Replace with your NJIT email
app_password = "jnzzeyeohwxsrxzl"  # Your app password

# Compose the message
msg = MIMEMultipart()
msg['From'] = sender_email
msg['To'] = receiver_email
msg['Subject'] = subject
msg.attach(MIMEText(message_body, 'plain'))

# Send email
try:
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as server:
        server.login(sender_email, app_password)
        server.send_message(msg)
    print("✅ Email sent successfully!")
except Exception as e:
    print("❌ Failed to send email:", e)
