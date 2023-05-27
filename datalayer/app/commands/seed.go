package commands

import (
	"fmt"
	// c "semicircle/web/app/common"
	m "semicircle/web/app/models"

	"gorm.io/gorm"
)

type _ m.BaseDbModel

func SeedDatabase(db *gorm.DB) {
	return
	addItems(db)
}

func addItems(db *gorm.DB) {
	for i := 0; i < 50; i += 1 {
		price := float64(115 * i + 70)
		name := fmt.Sprintf("PC Item %d", i + 1)

		db.Create(&m.Item{Name: name, UnitCode: "pc", Price: m.MonetaryAmount(price)})
	}
}
