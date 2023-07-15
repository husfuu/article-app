package handlers

import (
	"backend/app/helpers"
	"backend/app/models"
	"backend/app/usecases"
	"fmt"

	"github.com/gofiber/fiber/v2"
)

func GetPostsByPage(c *fiber.Ctx) error {
	page, _ := c.ParamsInt("limit")
	pageSize, _ := c.ParamsInt("offset")

	respData, errResp := usecases.GetPostByPage(page, pageSize)
	if errResp != nil {
		return helpers.ResponseError(errResp.Code, errResp.Message, "")(c)
	}

	return helpers.ResponseSuccess(fiber.StatusOK, "success to get articles", respData)(c)
}

func GetArticleById(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return helpers.ResponseError(fiber.StatusInternalServerError, "fail to parse", "")(c)
	}
	respData, errResp := usecases.GetArticleById(id)
	if errResp != nil {
		return helpers.ResponseError(errResp.Code, errResp.Message, "")(c)
	}
	return helpers.ResponseSuccess(fiber.StatusOK, fmt.Sprintf("success to get articles with id %d", id), respData)(c)
}

func GetArticleByStatus(c *fiber.Ctx) error {
	page, _ := c.ParamsInt("limit")
	pageSize, _ := c.ParamsInt("offset")
	status := c.Query("status")
	respData, total, errResp := usecases.GetArticleByStatus(page, pageSize, status)
	if errResp != nil {
		return helpers.ResponseError(errResp.Code, errResp.Message, "")(c)
	}
	return helpers.ResponseSuccessWithPagination(fiber.StatusOK, fmt.Sprintf("success to get articles with status = %s", status), respData, total)(c)
}

func CreateArticle(c *fiber.Ctx) error {
	payload := new(models.Article)
	err := c.BodyParser(payload)
	if err != nil {
		return helpers.ResponseError(fiber.StatusInternalServerError, "fail to parse", "")(c)
	}
	respData, errResp := usecases.CreateArticle(*payload)
	if errResp != nil {
		return helpers.ResponseError(errResp.Code, errResp.Message, "")(c)
	}
	return helpers.ResponseSuccess(fiber.StatusOK, "success to get articles", respData)(c)
}

func UpdateArticleById(c *fiber.Ctx) error {
	payload := new(models.Article)
	err := c.BodyParser(payload)
	if err != nil {
		return helpers.ResponseError(fiber.StatusBadRequest, "fail to parse", "")(c)
	}
	id, err := c.ParamsInt("id")
	if err != nil {
		return helpers.ResponseError(fiber.StatusBadRequest, "fail to parse", "")(c)
	}
	respData, errResp := usecases.UpdateArticle(id, *payload)
	if errResp != nil {
		return helpers.ResponseError(errResp.Code, errResp.Message, "")(c)
	}

	return helpers.ResponseSuccess(fiber.StatusOK, "success to get articles", respData)(c)
}

func DeleteArticleById(c *fiber.Ctx) error {
	id, err := c.ParamsInt("id")
	if err != nil {
		return helpers.ResponseError(fiber.StatusBadRequest, "fail to parse", "")(c)
	}

	respData, errResp := usecases.Delete(id)
	if errResp != nil {
		return helpers.ResponseError(errResp.Code, errResp.Message, "")(c)
	}

	return helpers.ResponseSuccess(fiber.StatusOK, "success to get articles", respData)(c)
}
