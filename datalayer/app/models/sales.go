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

	CustomerId uint
	Customer   *Customer `gorm:"foreignKey:CustomerId"`
	Timestamp  time.Time
}

type SaleItem struct {
	BaseDbModel

	SaleId uint
	Sale   Sale `gorm:"foreignKey:SaleId"`

	ItemId uint
	Item   Item `gorm:"foreignKey:ItemId"`

	Price    MonetaryAmount
	Quantity WholeQuantity
}

type SaleServiceOrder struct {
	BaseDbModel

	SaleId uint
	Sale   Sale `gorm:"foreignKey:SaleId"`

	ServiceId uint
	Service   Service `gorm:"foreignKey:ServiceId"`

	IssuedAt    time.Time
	FinalizedAt time.Time
	Status      c.ServiceOrderStatus

	PaymentMode c.PaymentMode

	CustomerId uint
	Customer   *Customer `gorm:"foreignKey:CustomerId"`

	AbsPrice         MonetaryAmount
	AbsTotalPrice    MonetaryAmount
	AbsDiscount      MonetaryAmount
	AbsValueUnitCode string
	AbsInput         uint
	AbsOutput        uint
	AbsWastage       uint
}
