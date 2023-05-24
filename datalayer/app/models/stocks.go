package models

import (
	c "semicircle/web/app/common"
	"time"
)

type Stock struct {
	BaseDbModel

	ItemID uint
	Item   Item `gorm:"foreignKey:ItemID"`

	Quantity  WholeQuantity
	UpdatedAt time.Time
}

type StockUpdateEvent struct {
	BaseDbModel
	ItemID uint
	Item   Item `gorm:"foreignKey:ItemID"`

	DeltaQty  WholeQuantity
	Kind      c.StockUpdateEventKind
	Timestamp time.Time

	// BuyOrder
	// Sale
	// Adjustment
	// Conversion
	RefID uint
}