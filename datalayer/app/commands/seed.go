package commands

import (
	m "semicircle/web/app/models"

	"gorm.io/gorm"
)

type _ m.BaseDbModel

func SeedDatabase(db *gorm.DB) {
	return
}
