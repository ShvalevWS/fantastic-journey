FROM python:3.10 as builder
COPY requirements.txt .

RUN pip install --user -r requirements.txt


FROM python:3.10-slim
WORKDIR /code

COPY --from=builder /root/.local /root/.local

COPY . .

USER root

ENV PATH=/root/.local:$PATH

EXPOSE 5000

CMD [ "python3", "-u", "main.py" ]