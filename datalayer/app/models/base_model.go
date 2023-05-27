package models

type BaseDbModel struct {
	Id uint64 `gorm:"primaryKey"`
}

type MonetaryAmount float64
