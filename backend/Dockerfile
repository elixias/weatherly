FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
RUN chmod +x migrate-and-start.sh
EXPOSE 8000
CMD prisma db push && fastapi run
#dev main.py