package models

import (
	"time"
)

type Customer struct {
	BaseDbModel
	Name       string
	Credit     MonetaryAmount
	Clearances []CreditClearance `gorm:"foreignKey:CustomerID"`
}

type CreditClearance struct {
	BaseDbModel
	CustomerID uint
	Customer   Customer `gorm:"foreignKey:CustomerID"`
	Amount     MonetaryAmount
	Timestamp  time.Time
}
