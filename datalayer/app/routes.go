package app

import (
	c "semicircle/web/app/common"
	"semicircle/web/app/controllers"
)

func LoadRoutes(app *c.Application) {
	baseRoute := app.ServerApp.Group("/api")
	v1 := baseRoute.Group("/v1")

	ctrlset := controllers.ControllerSet{App: app}

	v1.Get("/", ctrlset.Ping)

	v1.All("/s/QueryItems", ctrlset.QueryItems)
	v1.All("/s/CmdCreateItem", ctrlset.CmdCreateItem)

	// queriesPath := v1.Group("/q")
	// cmdsPath := v1.Group("/c")

	// queriesPath.All("/items", ctrlset.HandleQueryItems)
	// cmdsPath.All("/create-item", ctrlset.HandleCmdCreateItem)
}
