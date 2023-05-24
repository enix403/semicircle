package models

type BaseDbModel struct {
	ID uint `gorm:"primaryKey"`
}

type MonetaryAmount float64
