package usecases

import (
	"backend/app/helpers"
	"backend/app/models"
	"backend/app/repositories"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func GetPostByPage(page int, pageSize int) ([]models.Article, *helpers.Error) {
	posts, err := repositories.GetArticleByPage(page, pageSize)
	if err != nil {
		return nil, helpers.NewError(fiber.StatusInternalServerError, "error when get data")
	}

	return posts, nil
}

func GetArticleById(id int) (*models.Article, *helpers.Error) {
	if id == 0 {
		return nil, helpers.NewError(fiber.StatusBadRequest, "id should not be empty")
	}
	article, err := repositories.GetArticleById(id)
	if err != nil {
		return nil, helpers.NewError(fiber.StatusInternalServerError, "error when get data")
	}
	if article.Id == 0 {
		return nil, helpers.NewError(fiber.StatusNotFound, fmt.Sprintf("post %d is not found", id))
	}

	return &article, nil
}

func GetArticleByStatus(page int, pageSize int, status string) (*[]models.Article, int64, *helpers.Error) {
	var article []models.Article
	var total int64
	var err error

	if status == "" {
		article, err = repositories.GetAllArticles()
	} else {
		article, total, err = repositories.GetArticleByStatus(page, pageSize, status)
	}

	if err != nil {
		return nil, 0, helpers.NewError(fiber.StatusInternalServerError, "error when getting data")
	}

	return &article, total, nil
}

func CreateArticle(request models.Article) (int, *helpers.Error) {
	err := helpers.ValidateDataRequest(request)
	if err != nil {
		return 0, helpers.NewError(fiber.StatusBadRequest, err.Error())
	}

	articleId, err := repositories.CreateArticle(request)
	if err != nil {
		return 0, helpers.NewError(fiber.StatusInternalServerError, "error when inserting data")
	}

	return articleId, nil
}

func UpdateArticle(postId int, request models.Article) (int, *helpers.Error) {
	if postId == 0 {
		return 0, helpers.NewError(fiber.StatusBadRequest, "id should not be empty")
	}
	err := helpers.ValidateDataRequest(request)
	if err != nil {
		return 0, helpers.NewError(fiber.StatusBadRequest, err.Error())
	}

	// get data post first
	article, err := repositories.GetArticleById(postId)
	if err != nil {
		return 0, helpers.NewError(fiber.StatusInternalServerError, "error when get data")
	}
	if article.Id == 0 {
		return 0, helpers.NewError(fiber.StatusNotFound, fmt.Sprintf("post with id = %d is not found", postId))
	}

	articleId, err := repositories.UpdateArticle(postId, request)
	if err != nil {
		return 0, helpers.NewError(fiber.StatusInternalServerError, "error when update data")
	}
	return articleId, nil
}

func Delete(postId int) (int, *helpers.Error) {
	post, err := repositories.GetArticleById(postId)
	if err != nil {
		return 0, helpers.NewError(fiber.StatusInternalServerError, "error when get data")
	}
	if post.Id == 0 {
		return 0, helpers.NewError(fiber.StatusNotFound, fmt.Sprintf("post with id = %d is not found", postId))
	}

	result, err := repositories.Delete(postId)
	if err != nil {
		return 0, helpers.NewError(fiber.StatusInternalServerError, "error when delete data")
	}
	return result, nil
}
