![Stylized laptop side mockup](https://github.com/user-attachments/assets/b64e834b-dae0-43f0-9c2e-b42139c6b804)
# 🐣StudyBuddy Frontend🐣
Vision을 활용한 실시간 학습 관리 웹어플리케이션, StudyBuddy의 프론트엔드입니다!

<br><br>      

## 🔎 Introduction
StudyBuddy는 가상의 캐릭터 `노티`가 학습 자세를 관찰하고 피드백을 제공하며, 학습 결과를 시각화하여 목표 달성을 돕는 학습 플랫폼입니다.
이제, 혼자 공부하지 말고, StudyBuddy와 함께하세요!      

<br>
<br>      

### 🎥 Demonstration video
[![StudyBuddy 소개 영상](https://github.com/user-attachments/assets/8a6c9c70-004c-4e74-9f5e-1d58c37a0141)
](https://youtu.be/QcWG6GFLRQc)

<br><br>      

## 🛠️ Technology Stack
![기술스택_프론트](https://github.com/user-attachments/assets/fa2aaf97-e967-42ab-857d-867e5850a531)

<br>
<br>

## 📌 Features
### StudyRoom 

### Finish

### Calender

### Finish Group

### Login, SignUp
- 이메일과 비밀번호를 입력하여 로그인이 가능합니다.
- SNS(카카오톡, 구글) 로그인, 회원가입 기능을 제공하여 간편하게 서비스를 이용할 수 있습니다.
- 회원가입 시 이메일과 비밀번호에 대한 유효성 검사가 진행되며 통과해야 가입이 가능합니다.
- 로그인 후, StudyBuddy의 홈 화면으로 이동합니다.
<table>
  <tbody>
    <tr>
      <td align="center">로그인/회원가입</td>
    <tr/>
    <tr>
        <td align="center"><img src ="https://github.com/user-attachments/assets/e824ee13-ce56-4914-8840-43dbc05a5ddf"</td>
    </tr>
  </tbody>
</table>

### Setting
- 설정 페이지에서는 닉네임, 명언, 스터디메이트, 목표 시간을 설정할 수 있습니다.
- 닉네임을 입력하고 중복 검사를 통과하면 변경이 가능하고, 통과하지 못하면 경고창을 띄우며 변경이 불가능하게 됩니다.
- 명언은 랜덤 또는 직접 설정이 가능합니다.
- 스터디 메이트는 목소리와 말투를 설정할 수 있으며, 이는 디폴트 설정이 됩니다.
<table>
  <tbody>
    <tr>
      <td align="center">환경설정</td>
    <tr/>
    <tr>
        <td align="center"><img src ="https://github.com/user-attachments/assets/3c493913-a7b9-4f4e-8ac7-29449bdd1bdf" /></td>
    </tr>
  </tbody>
</table>

<br>
<br>

## 📂 Folder Archtecture
<details>
  <summary>폴더 구조 보기</summary>

  ```plaintext
📦 Front-end
 ├─ 📂public
 │  ├─ 📜favicon.ico
 │  ├─ 📜index.html
 │  ├─ 📜manifest.json
 │  └─ 📜robots.txt
 ├─ 📂src
 │  ├─ 📂api
 │  │  ├─ 📜auth.ts
 │  │  ├─ 📜index.ts
 │  │  └─ 📜user.ts
 │  ├─ 📂assets
 │  │  ├─ 📂audio
 │  │  │  ├─ 📜voice1.mp3
 │  │  │  ├─ 📜whitenoise.mp3
 │  │  │  └─ ...
 │  │  ├─ 📂fonts
 │  │  │  ├─ 📜InterBold.ttf
 │  │  │  ├─ 📜InterExtraBold.ttf
 │  │  │  └─ ...
 │  │  ├─ 📂images
 │  │  │  ├─ 📜account.png
 │  │  │  ├─ 📜arrow_right.png
 │  │  │  └─ ...
 │  │  └─ 📜Search_light.svg
 │  ├─ 📂components
 │  │  ├─ 📂account
 │  │  │  ├─ 📜GoogleButton.tsx
 │  │  │  ├─ 📜Join.tsx
 │  │  │  └─ ...
 │  │  ├─ 📂calendar
 │  │  │  ├─ 📜CalendarContext.tsx
 │  │  │  ├─ 📜Day.tsx
 │  │  │  └─ ...
 │  │  ├─ 📂common
 │  │  │  ├─ 📂Icons
 │  │  │  │  ├─ 📜CheckIcon.tsx
 │  │  │  │  └─ 📜SearchIcon.tsx
 │  │  │  ├─ 📂Layout
 │  │  │  │  ├─ 📜Footer.tsx
 │  │  │  │  ├─ 📜GenerateLayout.tsx
 │  │  │  │  └─ 📜MainLayout.tsx
 │  │  │  ├─ 📜AlertModal.tsx
 │  │  │  ├─ 📜Button.tsx
 │  │  │  └─ ...
 │  │  └─ ...
 │  ├─ 📂shared
 │  │  ├─ 📜Header.tsx
 │  │  ├─ 📜Router.tsx
 │  │  └─ Sidebar.tsx
 │  ├─ 📂pages
 │  │  ├─ 📜Account.tsx
 │  │  ├─ 📜Calender.tsx
 │  │  ├─ 📜Group.tsx
 │  │  ├─ 📜GroupGenerate.tsx
 │  │  ├─ 📜GroupMain.tsx
 │  │  └─ ...
 │  ├─ 📂styles
 │  │  ├─ 📜font.css
 │  │  ├─ 📜GlobalStyle.tsx
 │  │  └─ ...
 │  ├─ 📜App.tsx
 │  └─ 📜index.tsx
 ├─ 📜.env
 ├─ 📜.gitignore
 ├─ 📜package-lock.json
 ├─ 📜package.json
 ├─ 📜README.md
 └─ 📜tsconfig.json
```

