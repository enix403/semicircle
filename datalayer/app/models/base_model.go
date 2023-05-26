package models

type BaseDbModel struct {
	Id uint `gorm:"primaryKey"`
}

type MonetaryAmount float64
