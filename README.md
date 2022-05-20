# 🧾 영수증을 부탁해 

> 소규모 모임을 위한 영수증 및 회계 관리 서비스



## 🎇 프로젝트 소개

#### 📅 진행 기간 

- 2022.04.11 ~ 2022.05.20 (6주)



#### 🧐 기획 의도

모든 모임은 회계 관리에 대한 니즈가 있습니다. 하지만 회계 관리를 투명하게 관리하기란 쉽지 않습니다. 총무는 회원들에게 일일이 영수증을 받으러 다녀야하고, 이렇게 얻은 실물 영수증은 누락, 분실 등의 위험이 존재하기 때문입니다. 또한 모임 장부는 총무 개인이 관리하는 경우가 많아 회원들이 실시간으로 확인하기는 어렵습니다. 뿐만 아니라 회계에 대한 전문 지식이 없는 회원이 총무를 담당하게 될 경우에는 보고서 작성에 어려움을 겪기도 합니다. 

영수증을 부탁해는 이러한 불편함을 겪는 소모임들을 대상으로 **복잡한 회계 서비스를 단순하고 직관적으로 제공**하기 위해 기획되었습니다.



#### 🎯 타겟

- 거래 내역을 편리하게 관리하고 싶은 총무

- 회계를 잘 모르지만 총무를 맡게 된 회원

- 매번 총무에게 장부를 보여달라고 하기 민망한 회원

  

#### ⚙️ 주요 기능

| **기능**            | **설명**                                                     |
| ------------------- | ------------------------------------------------------------ |
| **영수증 등록**     | 총무에게 직접 영수증을 건넬 필요 없이, 모바일 환경에서 쉽게 영수증을 등록할 수 있습니다. |
| **영수증 OCR 인식** | 영수증을 등록하는 과정에서 AI가 거래 날짜와 총액을 인식하여 자동 입력해줍니다. |
| **거래 등록**       | 영수증을 기반으로 거래 상세 내역을 등록하여 관리할 수 있습니다. |
| **거래 내역 검색**  | 등록된 거래 내역을 날짜 및 태그로 검색할 수 있습니다.        |
| **지출 분석**       | 항목별 분석, 시계열 분석을 통해 지출 내역을 차트로 한 눈에 확인할 수 있습니다. |
| **보고서 확인**     | 보고를 위한 월별 자산현황표, 예산운영표를 자동으로 생성해주며, 생성된 보고서는 Excel 파일로 다운로드 받아 활용할 수 있습니다. |
| **푸시 알림**       | 요청이 등록 및 처리될 때마다 푸시 알림을 보내주어, 요청 현황을 실시간으로 확인할 수 있습니다. |



## ⛑ 아키텍처

![아키텍처](images/아키텍처.png)



## 🛠️ 기술 스택

#### 💻 프론트엔드

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"> 

<img src="https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=Android&logoColor=white"><img src="https://img.shields.io/badge/Kotlin-007396?style=for-the-badge&logo=Kotlin&logoColor=white"><img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white"> 



#### 🛢 백엔드

<img src="https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=Spring-Boot&logoColor=white"><img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=white"><img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"><img src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=Hibernate&logoColor=white">

<img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=FastAPI&logoColor=white"><img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">



#### 📡 인프라

<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"><img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white"><img src="https://img.shields.io/badge/Amazon AWS-232F3E?style=for-the-badge&logo=Amazon AWS&logoColor=white"><img src="https://img.shields.io/badge/NGINX-009639?style=for-the-badge&logo=NGINX&logoColor=white">



## 🗃 ERD

![erd](images/erd.png)



## 💡 사용 예시

1. **메인 화면**

   ![메인 페이지](images/메인 페이지.gif)

   - 서비스 소개 및 주요 기능 설명을 확인할 수 있습니다.

2. **모임 가입 신청**

   ![모임 가입](images/모임 가입.gif)

   - 모임을 검색하고, 원하는 모임에 가입 신청을 할 수 있습니다.

3. **모임 가입 승인**

   ![모임 가입 승인](images/모임 가입 승인.gif)

   - 모임 리더는 가입 신청 내역을 확인하고 승인 또는 거부할 수 있습니다.

4. **영수증 등록**

   ![영수증 청구](images/영수증 등록.gif)

   - 영수증 사진, 날짜, 총금액을 입력하여 영수증 청구 요청을 할 수 있습니다.
   - 영수증 사진을 등록할 때, AI를 통해 영수증이 분석되며 자동으로 날짜와 총금액이 입력됩니다.

5. **거래 등록** 

   ![거래 등록](images/거래 등록.gif)

   - 요청된 영수증 내역을 바탕으로 세부 내용을 적어 거래 등록을 할 수 있습니다.
   - 입력한 계정과목 대분류와 소분류는 보고서 작성에, 태그는 분석 차트에 사용됩니다.

6. **거래 내역 검색**

   ![거래 내역 검색](images/거래 내역 검색.gif)

   - 거래 내역을 내용, 태그를 기반으로 검색할 수 있습니다.

7. **지출 분석** 

   ![지출 분석](images/지출 분석.gif)

   - 월별로 모임이 지출한 내역들의 분석 결과를 차트로 확인할 수 있습니다.

8. **자산현황표**

   ![자산현황표](images/자산현황표.gif)

   - 월별 자산현황표를 확인할 수 있습니다. 

9. **예산운영표**

   ![예산운영표](images/예산운영표.gif)

   - 월별 예산운영표를 확인할 수 있습니다. 

10. **보고서 다운로드**

    ![보고서 다운로드](images/보고서 다운로드.gif)

    - 보고서는 Excel 파일로 저장하여 활용할 수 있습니다.



## 👨‍👧‍👧 팀 소개

| 팀원     | 담당                      | GitHub                                           |
| -------- | ------------------------- | ------------------------------------------------ |
| 서지원 👑 | 인공지능 및 백엔드 개발   | [@seojiwon0702](https://github.com/seojiwon0702) |
| 서상용   | 프론트엔드 개발           | [@ssy0061](https://github.com/ssy0061)           |
| 이우영   | 프론트엔드 개발, UCC 편집 | [@ujumom](https://github.com/ujumom)             |
| 양아름   | 백엔드 개발               | [@yeveyn](https://github.com/yeveyn)             |
| 신인호   | 프론트엔드 개발           | [@adiens916](https://github.com/adiens916)       |
| 조태연   | 프론트엔드 개발           | [@charleyCho](https://github.com/charleyCho)     |



## 📎 서비스 이용

[포팅 매뉴얼](https://lab.ssafy.com/s06-final/S06P31D104/-/blob/develop/exec/portingmanual.md)

[웹 사이트](https://k6d104.p.ssafy.io/)

[앱 다운로드](keep-my-receipt.apk)