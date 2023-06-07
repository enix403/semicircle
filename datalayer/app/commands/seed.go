package commands

import (
	"fmt"
	"math"
	// c "semicircle/web/app/common"
	m "semicircle/web/app/models"

	"gorm.io/gorm"
)

type _ m.BaseDbModel

func SeedDatabase(db *gorm.DB) {
	// return
	addItems(db)
}

func addItems(db *gorm.DB) {
	fracCount := 0
	for i := 0; i < 1200; i += 1 {
		price := float64(115 * int(math.Min(20, float64(i))) + 4000/(i+1) + i + 20)
		name := fmt.Sprintf("PC Item %d", i + 1)

		var unitCode string
		if i % 9 == 0 && fracCount < 5 {
			unitCode = "kg"
			fracCount += 1
		} else {
			unitCode = "pc"
		}

		db.Create(&m.Item{Name: name, UnitCode: unitCode, Price: m.MonetaryAmount(price)})
	}
}
