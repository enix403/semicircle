package commands

import (
	"semicircle/web/app/models"

	"gorm.io/gorm"
)

func SeedDatabase(db *gorm.DB) {
	return
	var item = models.RetailItem {
		Name: "Item C",
		Price: 4444,
	}
	db.Create(&item)
}
