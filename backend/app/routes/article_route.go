package routes

import (
	"backend/app/handlers"

	"github.com/gofiber/fiber/v2"
)

func ArticleRoute(app *fiber.App) {
	route := app.Group("/api/v1")

	route.Get("/articles/:limit/:offset", handlers.GetPostsByPage)
	route.Get("/articles/:id", handlers.GetArticleById)
	route.Get("/articles_status/:limit/:offset", handlers.GetArticleByStatus)
	route.Post("/articles", handlers.CreateArticle)
	route.Put("/articles/:id", handlers.UpdateArticleById)
	route.Delete("/articles/:id", handlers.DeleteArticleById)
}
