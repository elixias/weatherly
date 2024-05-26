#!/bin/bash

prisma db push
fastapi dev main.py