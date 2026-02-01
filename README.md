# 🎥 Movie Vault
![Status](https://img.shields.io/badge/Status-Work_in_Progress-orange?style=for-the-badge)

![Project Banner](https://github.com/user-attachments/assets/297e69f9-266e-436d-a8b6-3ea9e8b1251b)

> **Web Application สำหรับค้นหาและสำรวจข้อมูลภาพยนตร์และซีรีส์** ช่วยให้คุณเข้าถึงรายละเอียดหนังเรื่องโปรด เรื่องย่อ รวมถึงประวัตินักแสดงได้อย่างครบถ้วน

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

🔗 **Live Demo:** - <!--[Click Here to View App](https://expense-tracker-alpha-one-81.vercel.app/)-->

---

## ✨ Features (คุณสมบัติเด่น)

### 🎬 Movie & TV Discovery
- **Trending & Popular:** อัปเดตหนังใหม่มาแรง, หนังยอดนิยม และหนังคะแนนสูง (Top Rated) แบบ Real-time
- **Genre Classification:** แยกหมวดหมู่ชัดเจน (Action, Drama, Sci-Fi ฯลฯ) ช่วยให้ค้นหาแนวที่ชอบได้ง่าย

### 📝 Advanced Search
- **Smart Search:** ค้นหาชื่อหนังและซีรีส์ได้รวดเร็ว
- **Dynamic Filtering:** ค้นหาเจาะจงได้แม่นยำขึ้น โดยการกรองปีที่ฉาย หรือประเภทรายการ
- **Pagination Support:** รองรับการแสดงผลข้อมูลจำนวนมากด้วยระบบเปลี่ยนหน้า (Pagination) หรือ Load More

### 📄 Detailed Info
- **Comprehensive Metadata:** แสดงข้อมูลครบถ้วน ทั้งเรื่องย่อ (Plot), วันที่ฉาย, ความยาวหนัง และคะแนนรีวิวจากผู้ชม
- **Cast & Crew:** แสดงรายชื่อนักแสดงนำ (Top Cast) ในรูปแบบ Card ที่เลื่อนดูได้ พร้อมลิงก์ไปยังผลงานอื่นของนักแสดง

### ▶️ Video Integration
- **Embedded Player:** รับชม Official Trailer และ Teaser ได้ทันทีผ่าน YouTube Player ที่ฝังมาในตัวแอป
- **Seamless Experience:** ดูตัวอย่างหนังได้โดยไม่ต้องกดออกจากหน้าเว็บ หรือเปิดแท็บใหม่

### ❤️ Watchlist System
- **Personal Collection:** บันทึกรายการหนังที่ "อยากดู" หรือ "เรื่องโปรด" เก็บไว้ใน Watchlist ส่วนตัว
- **Data Persistence:** ข้อมูลรายการโปรดไม่หายแม้ปิด Browser

### ⚙️ Utilities & UX
- **Responsive Design:** รองรับการใช้งานสมบูรณ์แบบทั้งบน Mobile, Tablet และ Desktop
- **Dark Mode:** ถนอมสายตาด้วยโหมดกลางคืน
- **Optimistic UI:** แสดงผลสถานะการโหลดและตอบสนองทันทีที่ผู้ใช้ทำรายการ เพื่อความลื่นไหลในการใช้งาน

---

## 🛠️ Installation
หากต้องการรันโปรเจคนี้ในเครื่องของคุณ (Local Environment)

**Prerequisites:** TypeScript, Node.js (v16+), Git

```bash
# 1. Clone the repository
git clone https://github.com/Serista3/movie_vault.git

# 2. Enter the directory
cd movie_vault

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

### 🔑 Environment Variables
โปรเจคนี้จำเป็นต้องใช้ API Key จาก TMDB ในการดึงข้อมูล
1. สมัครขอ API Key ได้ที่ [TMDB website](https://www.themoviedb.org/)
2. สร้างไฟล์ `.env` ใน root directory
3. เพิ่ม key ของคุณลงในไฟล์:
```env
VITE_API_BASE_URL=https://api.themoviedb.org/3/
VITE_IMAGE_BASE_URL=https://image.tmdb.org/t/p/original
VITE_API_KEY=your_api_key_here
VITE_API_READ_ACCESS_TOKEN=your_api_read_access_token_here
```

## 🏬 Project Structure
โครงสร้างไฟล์ถูกออกแบบโดยเน้นความ Modular และ Scalable
```text
src/
├───assets/              # เก็บไฟล์ Static เช่น รูปภาพ, ไอคอน, และ Global Styles
│   └───images/          # เก็บรูปภาพที่ใช้ในโปรเจค
├───components/          # UI Components
│   ├───common/          # Component พื้นฐานที่ใช้ซ้ำบ่อย (เช่น Button, Input, Card)
│   ├───layout/          # Component ที่เป็นโครงสร้างหลัก (เช่น Navbar, Sidebar, Footer)
│   └───skeleton/        # Component สำหรับแสดงผลระหว่างรอโหลดข้อมูล (Loading State)
├───hooks/               # เก็บ Logic ที่ใช้ซ้ำ (Custom Hooks)
├───pages/               # เก็บหน้าหลักของเว็บไซต์ (Views)
├───routes/              # การตั้งค่าเส้นทางของเว็บไซต์ (Router Configuration)
├───services/            # เก็บฟังก์ชันสำหรับการเรียก API และเชื่อมต่อ Backend
├───store/               # การจัดการ Global State
├───types/               # เก็บ TypeScript Interfaces และ Type Definitions
└───utils/               # เก็บฟังก์ชันตัวช่วยทั่วไป (Helper Functions)
```

## 📚 Technical Highlights (สิ่งที่ได้เรียนรู้)
โปรเจคนี้เน้นการประยุกต์ใช้ React และ TypeScript ร่วมกัน:
- **TypeScript Integration:** เขียนโค้ดโดยใช้ TypeScript ทั้งหมด มีการกำหนด Type และ Interface อย่างชัดเจนสำหรับ API Response, Props และ State (หลีกเลี่ยงการใช้ any) เพื่อความเสถียรของแอปพลิเคชัน
- **Modern React Patterns:** พัฒนาด้วย Functional Components และใช้งาน Hooks มาตรฐาน (useState, useReducer, useEffect, useContext) รวมถึงสร้าง Custom Hooks (เช่น useFetch) เพื่อแยก Logic ออกจาก UI
- **Client-Side Routing:** จัดการเส้นทาง URL ด้วย React Router v6 รองรับการทำ Dynamic Routing (เช่น /movie/:id) และ Nested Routes
- **Efficient Data Fetching:** เชื่อมต่อและดึงข้อมูลจาก TMDB API แบบ Asynchronous พร้อมจัดการสถานะการโหลด (Loading State) และการจัดการข้อผิดพลาด (Error Handling) อย่างเป็นระบบ
- **Hybrid Data Fetching:** เลือกใช้เทคนิคที่เหมาะสมที่สุดสำหรับแต่ละสถานการณ์ โดยใช้ Router Loaders สำหรับข้อมูลหลักที่ต้องมีก่อนเข้าหน้าเว็บ และใช้ useEffect Hooks สำหรับการอัปเดตข้อมูลแบบ Dynamic ภายในหน้า (เช่น Lazy Loading)
- **UX Enhancements:** เพิ่มประสบการณ์การใช้งานที่ดีด้วย Skeleton Loading (แสดงโครงสร้างขณะรอข้อมูล) ทำให้แอปดูตอบสนองไวและลื่นไหล
- **Responsive Layout:** ใช้ TailwindCSS Grid/Flexbox จัดการหน้าจอที่หลากหลายโดยไม่ต้องเขียน Custom CSS เยอะ

## 🚀 Roadmap
- [ ] เพิ่มระบบ Authentication (Login/Register)
- [ ] พัฒนา UI รองรับ PWA (Progressive Web App)
- [ ] สร้างระบบ Backend ของตัวเอง (Node.js/Express)

## 🧑‍💼 Contact
หากมีข้อเสนอแนะหรือพบปัญหาในการใช้งาน สามารถติดต่อได้ที่: 📧 Email: stacla5282@gmail.com
