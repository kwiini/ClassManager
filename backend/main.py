from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas
from typing import List

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# 添加 CORS 中间件
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 允许所有来源跨域，生产环境建议写具体域名
    allow_credentials=True,
    allow_methods=["*"],  # 允许所有方法
    allow_headers=["*"],  # 允许所有请求头
)

# 依赖注入：数据库 session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/courses", response_model=List[schemas.CourseOut])
def read_courses(db: Session = Depends(get_db)):
    return db.query(models.Course).all()

@app.post("/courses", response_model=schemas.CourseOut)
def create_course(course: schemas.CourseCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Course).filter_by(id=course.id).first()
    if existing:
        raise HTTPException(status_code=400, detail="课程编号已存在")
    db_course = models.Course(**course.dict())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    return db_course

@app.delete("/course/{id}")
def delete_course(id: int, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter_by(id=id).first()
    if not course:
        raise HTTPException(status_code=404, detail="课程不存在")
    db.delete(course)
    db.commit()
    return {"message": "删除成功"}
