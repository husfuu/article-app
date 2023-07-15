package helpers

import "github.com/gofiber/fiber/v2"

func ResponseError(statusCode int, message string, data string) fiber.Handler {
	return func(c *fiber.Ctx) error {
		return c.Status(statusCode).JSON(fiber.Map{
			"status":  statusCode,
			"message": message,
			"data":    data,
		})
	}
}

func ResponseSuccess[T any](statusCode int, message string, data T) fiber.Handler {
	return func(c *fiber.Ctx) error {
		return c.Status(statusCode).JSON(fiber.Map{
			"status":  statusCode,
			"message": message,
			"data":    data,
		})
	}
}

func ResponseSuccessWithPagination[T any](statusCode int, message string, data T, total int64) fiber.Handler {
	return func(c *fiber.Ctx) error {
		return c.Status(statusCode).JSON(fiber.Map{
			"status":  statusCode,
			"message": message,
			"data":    data,
			"total":   total,
		})
	}
}
