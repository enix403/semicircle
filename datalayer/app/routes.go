package app

import (
	"semicircle/web/app/controllers"
	c "semicircle/web/app/common"
)

func LoadRoutes(app *c.Application) {
	baseRoute := app.ServerApp.Group("/api")
	v1 := baseRoute.Group("/v1")

	ctrlset := controllers.ControllerSet{App: app}

	v1.Get("/", ctrlset.Ping)

	queriesPath := v1.Group("/query")
	queriesPath.All("/items", ctrlset.HandleItemsQuery)
}