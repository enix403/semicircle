package app

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	fiber_cors "github.com/gofiber/fiber/v2/middleware/cors"

	c "semicircle/web/app/common"
)

func colorScheme() fiber.Colors {
	colors := fiber.DefaultColors
	colors.Black = colors.Magenta
	return colors
}

func startServer(app *c.Application) {
	fiberApp := fiber.New(fiber.Config{
		CaseSensitive: true,
		Immutable:     true,
		Concurrency:   2,
		ColorScheme:   colorScheme(),
	})
	app.ServerApp = fiberApp

	fiberApp.Use(fiber_cors.New(fiber_cors.Config{
		AllowOriginsFunc: func(origin string) bool {
			return true
		},
	}))

	LoadRoutes(app)

	// TODO: manage proper app config
	const PORT = 12096
	fiberApp.Listen(fmt.Sprintf(":%d", PORT))
}

func BootServerApp() {
	// do the database
	db := ConnectToDatabase()

	app := c.NewApplication()
	app.Db = db

	startServer(app)
}
