FROM alpine:latest

WORKDIR /app

# Install Python 3 and required system dependencies
RUN apk add --no-cache \
    python3 \
    py3-pip \
    py3-numpy \
    py3-pillow \
    build-base \
    python3-dev

# Copy requirements
COPY requirements.txt .

# Install Python dependencies (break-system-packages is safe in Docker containers)
RUN pip install --no-cache-dir --break-system-packages -r requirements.txt

# Copy application code
COPY main.py .
COPY mushroom_model.keras .
COPY mushroom_names.json .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
