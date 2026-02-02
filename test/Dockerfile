# Test Dockerfile - minimal for testing without network pull
# This uses alpine:latest which is small and usually cached locally

FROM alpine:latest

WORKDIR /app

# Install minimal Python runtime
RUN apk add --no-cache \
    python3 \
    py3-pip

# Copy requirements
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY main.py .
COPY mushroom_model.keras .

# Expose port
EXPOSE 8000

# Run the application
CMD ["python3", "main.py"]
