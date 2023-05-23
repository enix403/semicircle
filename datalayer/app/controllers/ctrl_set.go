package controllers

import (
	"github.com/gofiber/fiber/v2"
	c "semicircle/web/app/common"
)

type ControllerSet struct {
	App *c.Application
}

type Ping_Out struct {
	PingValue string `json:"ping"`
}

func (ctrl ControllerSet) Ping(c *fiber.Ctx) error {
	return c.JSON(Ping_Out{
		PingValue: "pong",
	})
}
