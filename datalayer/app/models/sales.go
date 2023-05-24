package models

import (
	c "semicircle/web/app/common"
	"time"
)

type Sale struct {
	BaseDbModel

	GrandTotal MonetaryAmount
	Discount   MonetaryAmount

	PaymentMode c.PaymentMode

	CustomerID uint
	Customer   *Customer `gorm:"foreignKey:CustomerID"`
	Timestamp  time.Time
}

type SaleItem struct {
	BaseDbModel

	SaleID uint
	Sale   Sale `gorm:"foreignKey:SaleID"`

	ItemID uint
	Item   Item `gorm:"foreignKey:ItemID"`

	Price    MonetaryAmount
	Quantity WholeQuantity
}

type SaleServiceOrder struct {
	BaseDbModel

	SaleID uint
	Sale   Sale `gorm:"foreignKey:SaleID"`

	ServiceID uint
	Service   Service `gorm:"foreignKey:ServiceID"`

	IssuedAt    time.Time
	FinalizedAt time.Time
	Status      c.ServiceOrderStatus

	PaymentMode c.PaymentMode

	CustomerID uint
	Customer   *Customer `gorm:"foreignKey:CustomerID"`

	AbsPrice         MonetaryAmount
	AbsTotalPrice    MonetaryAmount
	AbsDiscount      MonetaryAmount
	AbsValueUnitCode string
	AbsInput         uint
	AbsOutput        uint
	AbsWastage       uint
}
