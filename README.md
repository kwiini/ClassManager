# Course Manager - FastAPI + Vue 3 实现

![FastAPI](https://img.shields.io/badge/FastAPI-0.95+-blue)
![Python](https://img.shields.io/badge/Python-3.8+-yellowgreen)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-1.4+-orange)
![MySQL](https://img.shields.io/badge/MySQL-8.x-blue)
![Uvicorn](https://img.shields.io/badge/Uvicorn-0.20+-cyan)
![PyMySQL](https://img.shields.io/badge/PyMySQL-1.0+-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-4.x-blue)
![UnoCSS](https://img.shields.io/badge/UnoCSS-0.50+-green)

这是一个简单的课程管理系统示例，演示如何使用 FastAPI 构建后端 API，使用 SQLAlchemy 连接 MySQL 数据库，前端使用 Vue 3 + Pinia 管理状态，实现课程的增删查。

---

## 技术栈

| 层级   | 技术       | 说明                   |
| ------ | ---------- | ---------------------- |
| 后端   | FastAPI    | Python Web 框架        |
|        | SQLAlchemy | ORM                    |
|        | PyMySQL    | MySQL 驱动             |
|        | Uvicorn    | ASGI 服务器            |
| 数据库 | MySQL      | 关系型数据库           |
| 前端   | Vue 3      | 渐进式 JavaScript 框架 |
|        | Pinia      | Vue 3 官方状态管理库   |
|        | Axios      | HTTP 请求              |

---

## 项目结构

```txt
course-manager/
├── backend/                # 后端代码
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   └── requirements.txt
└── frontend/               # 前端代码
    ├── src/
    │   ├── api/
    │   ├── stores/
    │   ├── types/
    │   ├── components/
    │   └── App.vue
    ├── package.json
    ├── uno.config.ts
    └── vite.config.ts
```

------

## 后端

### 1. 环境准备

创建虚拟环境并安装依赖：

```bash
cd backend
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install fastapi uvicorn sqlalchemy pymysql pydantic
```

也可以使用 `requirements.txt`（内容示例）：

```nginx
fastapi
uvicorn
sqlalchemy
pymysql
pydantic
```

安装：

```python
pip install -r requirements.txt
```

------

### 2. 数据库配置（database.py）

```python
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "mysql+pymysql://root:password@localhost/dbname"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
```

请根据你的 MySQL 实际账号密码和数据库名替换 `DATABASE_URL`。

------

### 3. 数据模型（models.py）

```python
from sqlalchemy import Column, Integer, String
from database import Base

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True)
    teacher = Column(String(100))
```

------

### 4. Pydantic 模型（schemas.py）

```python
from pydantic import BaseModel

class CourseBase(BaseModel):
    id: int
    name: str
    teacher: str

class CourseCreate(CourseBase):
    pass

class CourseOut(CourseBase):
    class Config:
        from_attributes = True
```

------

### 5. 启动后端服务

```bash
uvicorn main:app --reload
```

默认监听地址：http://127.0.0.1:8000

------

## 前端

### 1. 环境准备

需要安装 Node.js（建议16+），使用 npm 或 yarn。

进入前端目录安装依赖：

```bash
cd frontend
npm install
# 或者 yarn
yarn
```

------

### 2. 代码结构示例

- `src/stores/courseStore.ts`

```typescript
import { defineStore } from 'pinia';
import type { Course } from '../types/course';
import * as courseApi from '../api/courseApi';

export const useCourseStore = defineStore('course', {
    state: () => ({
        courses: [] as Course[],
    }),
    actions: {
        async fetchCourses() {
            this.courses = await courseApi.getCourses();
        },
        async addCourse(course: Course) {
            const newCourse = await courseApi.createCourse(course);
            this.courses.push(newCourse);
        },
        async removeCourse(id: number) {
            await courseApi.deleteCourse(id);
            this.courses = this.courses.filter(c => c.id !== id);
        },
    },
});
```

------

### 3. 启动前端

```bash
npm run dev
# 或 yarn dev
```

------

## 参考链接

- FastAPI 官方文档
- SQLAlchemy 官方文档
- Vue 3 官方文档
- Pinia 官方文档
- [UnoCSS](https://github.com/unocss/unocss)

------

## 许可证

MIT © kwiini