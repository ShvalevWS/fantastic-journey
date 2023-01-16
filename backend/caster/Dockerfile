FROM python:3.10 as builder
COPY requirements.txt .

RUN pip install --user -r requirements.txt


FROM python:3.10-slim
WORKDIR /caster

COPY --from=builder /root/.local /root/.local

COPY . .

USER root

ENV PATH=/root/.local:$PATH

EXPOSE 2101

CMD [ "python3", "-u", "main.py" ]
