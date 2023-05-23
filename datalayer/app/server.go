package app

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
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
