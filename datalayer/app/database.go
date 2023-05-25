package app

import (
	m "semicircle/web/app/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

// type _ m.BaseDbModel

type DBHandle *gorm.DB

func ConnectToDatabase() *gorm.DB {
	db, err := gorm.Open(sqlite.Open("app.db"), &gorm.Config{
		NamingStrategy: schema.NamingStrategy{
			SingularTable: true,
		},
	})
	if err != nil {
		panic("Failed to connect to the database")
	}

	return db
}

func MigrateDB(db *gorm.DB) {
	db.AutoMigrate(
		&m.StoreMeta{},
		&m.AccountingEvent{},
		&m.Customer{},
		&m.CreditClearance{},
		&m.Item{},
		&m.Service{},
		&m.ItemConversion{},
		&m.Stock{},
		&m.StockUpdateEvent{},
		&m.Supplier{},
		&m.SupplierAssignment{},
		&m.BuyOrder{},
		&m.BuyOrderItem{},
		&m.Sale{},
		&m.SaleItem{},
		&m.SaleServiceOrder{},
	)
}
