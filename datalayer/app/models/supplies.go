package models

import (
	c "semicircle/web/app/common"
	"time"
)

// Used as an embedded struct
type BORate struct {
	RateValue MonetaryAmount
	RateUnit  CompositeQuantity `gorm:"embedded;embeddedPrefix:rateunit_cq"`
}

type Supplier struct {
	BaseDbModel
	Name string
	// TODO: IDs like NTN etc
}

type SupplierAssignment struct {
	BaseDbModel
	SupplierID uint
	Supplier   Supplier `gorm:"foreignKey:SupplierID"`

	ItemID uint
	Item   Item `gorm:"foreignKey:ItemID"`

	BORate
}

type BuyOrder struct {
	BaseDbModel
	SupplierID uint
	Supplier   Supplier `gorm:"foreignKey:SupplierID"`

	IssuedAt    time.Time
	DeliveredAt time.Time
	Status      c.BuyOrderStatus
}

type BuyOrderItem struct {
	BaseDbModel

	BuyOrderID uint
	BuyOrder   BuyOrder `gorm:"foreignKey:BuyOrderID"`

	ItemID uint
	Item   Item `gorm:"foreignKey:ItemID"`

	BORate
	SupplyQty WholeQuantity
}
