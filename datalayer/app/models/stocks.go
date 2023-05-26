package models

import (
	c "semicircle/web/app/common"
	"time"
)

type Stock struct {
	BaseDbModel

	ItemId uint
	Item   Item `gorm:"foreignKey:ItemId"`

	Quantity  WholeQuantity
	UpdatedAt time.Time
}

type StockUpdateEvent struct {
	BaseDbModel
	ItemId uint
	Item   Item `gorm:"foreignKey:ItemId"`

	DeltaQty  WholeQuantity
	Kind      c.StockUpdateEventKind
	Timestamp time.Time

	// BuyOrder
	// Sale
	// Adjustment
	// Conversion
	RefId uint
}