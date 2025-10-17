---
title: o8knot
slug: knot
category: Web
year: 2024
client: Self-project.
role: Solo development
duration: 1 months
description: 검색 결과 요약, 에이전트 채팅 기능을 제공하는 검색엔진입니다.
image: /projects/knot/knot.png
link: 
tags:
  - MongoDB
  - AI
  - React
  - NextJS
  - Fastapi
featured: false
---

## The Challenge

검색 과정에서, 일반적인 기존 검색은 결과만을 나열해서 보여줌.
이는 특정 정보만을 원하는 사용자의 시간과 자원을 낭비하게 함.
AI 검색의 경우에는, 출처가 불분명하며, 할루시네이션의 가능성이 존재함.

## The Solution

검색엔진의 장점 + AI 검색의 장점 결합

1. **Backend Architecture**: Next JS +  MondoDB + FastAPI
2. **Frontend Design**: React + Tailwind CSS
3. **Database Management**: Mongo DB Atlas
4. **Authentication & Authorization**: Self-made JWT token
5. **Deployment**: Vercel.

### Key Features

### 1.인터넷 검색
Google search API를 활용하여 인터넷 검색결과를 가져옴

### 2. 검색 결과 요약
OpenAI GPT-3.5-turbo를 활용하여 검색 결과 요약

### 3. 검색 결과 자연어 탐색
채팅을 기반으로 검색 결과를 탐색할 수 있는 기능

### 4. 사용자 개인화 설정
사용자가 원하는 검색 결과를 저장하고, 추천받는 기능 / 사용자의 이전 검색 데이터 기반 중요도(추천도)재배열
