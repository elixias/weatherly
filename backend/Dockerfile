FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# EXPOSE 8000
CMD prisma db push && fastapi run main.py --port 8000
#dev main.py