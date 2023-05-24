package models

import (
	c "semicircle/web/app/common"
	"time"
)

type Item struct {
	BaseDbModel
	Name       string
	AppCode    string
	BarCode    string
	BarCodeStd string

	// One of:
	// 		Retail
	//		Raw
	// 		Self Packaged
	Kind c.ItemKind

	// Identification for item's unit
	UnitCode string
	// Retail price
	Price MonetaryAmount

	OpenForSale bool
	Active      bool
}

type Service struct {
	BaseDbModel
	Name string
	Code string
	// ABStract Price. Its meaning is defined in code.
	AbsPrice string
	Active   bool
}

// ------------------------------------

type ItemConversion struct {
	BaseDbModel
	SourceItemID uint
	SourceItem   Item `gorm:"foreignKey:SourceItemID"`
	TargetItemID uint
	TargetItem   Item `gorm:"foreignKey:TargetItemID"`

	DeltaSource WholeQuantity
	DeltaTarget WholeQuantity
	WasteSource WholeQuantity

	Timestamp time.Time
}
