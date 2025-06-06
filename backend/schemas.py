from pydantic import BaseModel

class CourseBase(BaseModel):
    id: int
    name: str
    teacher: str

class CourseCreate(CourseBase):
    pass

class CourseOut(CourseBase):
    class Config:
        orm_mode = True
