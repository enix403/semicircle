package common

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
)

type Application struct {
	ServerApp *fiber.App
	Db        *gorm.DB
}

func NewApplication() *Application {
	return &Application{}
}
