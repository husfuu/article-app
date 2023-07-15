package models

type Article struct {
	Id       int    `json:"id" gorm:"column:id;primaryKey;autoIncrement"`
	Title    string `json:"title" validate:"required,min=20" gorm:"column:title;size:200"`
	Content  string `json:"content" validate:"required,min=200" gorm:"column:content;type:text"`
	Category string `json:"category" validate:"required,min=3" gorm:"column:category;size:100"`
	Status   string `json:"status" validate:"required,oneof=publish draft trash" gorm:"column:status;size:100"`
}

func (Article) TableName() string {
	return "posts"
}
