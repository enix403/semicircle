package models

import (
	"time"
)

type Customer struct {
	BaseDbModel
	Name       string
	Credit     MonetaryAmount
	Clearances []CreditClearance `gorm:"foreignKey:CustomerId"`
}

type CreditClearance struct {
	BaseDbModel
	CustomerId uint
	Customer   Customer `gorm:"foreignKey:CustomerId"`
	Amount     MonetaryAmount
	Timestamp  time.Time
}
