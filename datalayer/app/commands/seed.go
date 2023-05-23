package commands

import (
	m "semicircle/web/app/models"

	"gorm.io/gorm"
)

type _ m.BaseModel

func SeedDatabase(db *gorm.DB) {
	return
}
