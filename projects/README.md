# Projects

프로젝트 폴더 구조와 마크다운 파일을 이 폴더에 저장합니다.

## 폴더 구조

각 프로젝트는 별도의 폴더에 저장되며, 다음과 같은 구조를 따릅니다:

```
projects/
├── project-slug/
│   ├── index.md          # 프로젝트 마크다운 파일
│   └── thumbnail.png     # 프로젝트 썸네일 이미지
├── another-project/
│   ├── index.md
│   └── thumbnail.png
└── README.md             # 이 파일
```

## 마크다운 형식

각 프로젝트의 `index.md` 파일은 다음 구조를 따라야 합니다:

```markdown
---
title: 프로젝트 이름
slug: project-slug
category: 카테고리
year: 2024
client: 클라이언트 이름 (선택사항)
role: 역할 (선택사항)
duration: 기간 (선택사항)
description: 프로젝트 설명
image: /projects/project-slug/thumbnail.png
tags:
  - 기술1
  - 기술2
featured: true  # featured 프로젝트인지 여부
---

## Section 1

본문 내용...

## Section 2

더 많은 내용...
```

## 필수 필드

- `title`: 프로젝트 제목
- `slug`: URL 슬러그 (폴더명과 동일해야 함)
- `category`: 프로젝트 카테고리
- `year`: 연도
- `description`: 짧은 설명
- `image`: 썸네일 이미지 경로 (형식: `/projects/[폴더명]/thumbnail.png`)

## 선택 필드

- `client`: 클라이언트 이름
- `role`: 담당 역할
- `duration`: 프로젝트 기간
- `tags`: 사용한 기술 배열
- `featured`: Featured 섹션에 표시 여부 (기본값: false)

## 새 프로젝트 추가하기

1. **폴더 생성**: `projects/[project-slug]/` 폴더 생성
2. **마크다운 작성**: `projects/[project-slug]/index.md` 파일 생성
3. **이미지 추가**: `projects/[project-slug]/thumbnail.png` 이미지 추가
4. **프론트매터 설정**: 위의 필드들을 정확히 입력
5. **마크다운 콘텐츠**: h2부터 시작하여 프로젝트 설명 작성

## 마크다운 작성 팁

- h2 (`## `)부터 시작하세요
- 강조는 `**굵게**` 또는 `*기울임*` 사용
- 리스트는 `-` 또는 `1.` 사용
- 코드 블록은 ` ``` ` 사용
- 이미지 경로는 절대 경로 사용 (`/projects/[폴더명]/filename.png`)

## 예시

`hubspot-cms-theme/index.md` 참고

## 이미지 가이드

- **형식**: PNG, JPG, WebP 권장
- **크기**: 최소 1200x600px (16:9 비율 권장)
- **파일명**: 보통 `thumbnail.png` 사용
- **경로**: `image: /projects/[폴더명]/thumbnail.png`