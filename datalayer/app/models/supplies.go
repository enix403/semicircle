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
	// TODO: Ids like NTN etc
}

type SupplierAssignment struct {
	BaseDbModel
	SupplierId uint
	Supplier   Supplier `gorm:"foreignKey:SupplierId"`

	ItemId uint
	Item   Item `gorm:"foreignKey:ItemId"`

	BORate
}

type BuyOrder struct {
	BaseDbModel
	SupplierId uint
	Supplier   Supplier `gorm:"foreignKey:SupplierId"`

	IssuedAt    time.Time
	DeliveredAt time.Time
	Status      c.BuyOrderStatus
}

type BuyOrderItem struct {
	BaseDbModel

	BuyOrderId uint
	BuyOrder   BuyOrder `gorm:"foreignKey:BuyOrderId"`

	ItemId uint
	Item   Item `gorm:"foreignKey:ItemId"`

	BORate
	SupplyQty WholeQuantity
}
