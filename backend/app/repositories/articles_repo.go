package repositories

import (
	"backend/app/models"
	"backend/database"
	"log"
	"time"
)

func GetArticleByPage(pageStart int, pageSize int) ([]models.Article, error) {
	db := database.DB
	var result []models.Article
	offset := (pageStart - 1) * pageSize
	qList := `
	SELECT id, title, content, category, status FROM posts 
	LIMIT ? OFFSET ?;
	`
	err := db.Raw(qList, pageSize, offset).Scan(&result).Error

	return result, err
}

func GetArticleById(id int) (models.Article, error) {
	db := database.DB
	var result models.Article
	sql := `SELECT id, title, content, category, status FROM posts where id=?`
	err := db.Raw(sql, id).Scan(&result).Error
	return result, err
}

func GetAllArticles() ([]models.Article, error) {
	db := database.DB
	var result []models.Article
	sql := `SELECT id, title, content, category, status FROM posts`
	err := db.Raw(sql).Scan(&result).Error

	return result, err
}

func GetArticleByStatus(pageStart int, pageSize int, status string) ([]models.Article, int64, error) {
	db := database.DB
	var result []models.Article
	offset := (pageStart - 1) * pageSize
	countSql := `SELECT COUNT(*) FROM posts WHERE status = ?;`
	var countResult int64
	err := db.Raw(countSql, status).Count(&countResult).Error
	if err != nil {
		return result, 0, err
	}
	sql := `SELECT id, title, content, category, status FROM posts where status=? LIMIT ? OFFSET ?;`
	err = db.Raw(sql, status, pageSize, offset).Scan(&result).Error
	return result, countResult, err
}

func CreateArticle(request models.Article) (int, error) {
	db := database.DB
	var article models.Article
	qInsert := `
		INSERT INTO posts(title, content, category, status, created_date)
		VALUES(?,?,?,?,?);
	`
	result := db.Exec(qInsert, request.Title, request.Content, request.Category, request.Status, time.Now())
	if result.Error != nil {
		log.Println(result.Error)
		return 0, result.Error
	}

	rowsAffected := result.RowsAffected
	if rowsAffected == 0 {
		return 0, nil
	}

	data := result.Last(&article)

	return article.Id, data.Error
}

func UpdateArticle(postId int, request models.Article) (int, error) {
	db := database.DB
	qUpdate := `
	UPDATE posts
	SET title=?,content=?,category=?,status=?,updated_date=?
	WHERE id=?	
	`
	result := db.Exec(qUpdate,
		request.Title,
		request.Content,
		request.Category,
		request.Status,
		time.Now(),
		postId)

	return postId, result.Error
}

func Delete(postId int) (int, error) {
	db := database.DB
	qDelete := `
	DELETE FROM posts WHERE id=?
	`
	result := db.Exec(qDelete, postId)

	return postId, result.Error
}
