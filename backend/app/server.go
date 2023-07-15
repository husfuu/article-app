package app

import (
	"backend/app/routes"
	"backend/database"
	"fmt"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func Run(port int) {
	app := fiber.New(fiber.Config{
		AppName:      "POS Services Dev",
		ServerHeader: "Fiber",
	})
	// Or extend your config for customization
	app.Use(cors.New(cors.Config{
		AllowHeaders: "Origin,Content-Type,Accept,Content-Length,Accept-Language,Accept-Encoding,Connection,Access-Control-Allow-Origin",
		AllowOrigins: "*",
		// AllowCredentials: true,
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,PATCH,OPTIONS",
	}))

	// database connector
	database.ConnectDB()

	// routes
	routes.ArticleRoute(app)

	log.Fatal(app.Listen(fmt.Sprintf(":%d", port)))
}
