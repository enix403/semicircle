package models

import (
	c "semicircle/web/app/common"
	protos_sm "semicircle/web/protos.sm"
	"time"
)

type Item struct {
	BaseDbModel
	Name       string
	AppCode    string
	BarCode    string
	BarCodeStd string `gorm:"default:none"`

	// One of:
	// 		Retail
	//		Raw
	// 		Self Packaged
	Kind c.ItemKind `gorm:"default:retail"` // default temporary

	// Identification for item's unit
	UnitCode string
	// Retail price
	Price MonetaryAmount

	OpenForSale bool `gorm:"default:true"`
	Active      bool `gorm:"default:true"`
}

func (src *Item) HydrateProto(dst *protos_sm.Item) {
	dst.Id = src.Id
	dst.Name = src.Name
	dst.AppCode = src.AppCode
	dst.BarCode = src.BarCode
	dst.BarCodeStd = src.BarCodeStd
	dst.Kind = string(src.Kind)
	dst.UnitCode = src.UnitCode
	dst.Price = float64(src.Price)
	dst.OpenForSale = src.OpenForSale
	dst.Active = src.Active
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
	SourceItemId uint
	SourceItem   Item `gorm:"foreignKey:SourceItemId"`
	TargetItemId uint
	TargetItem   Item `gorm:"foreignKey:TargetItemId"`

	DeltaSource WholeQuantity
	DeltaTarget WholeQuantity
	WasteSource WholeQuantity

	Timestamp time.Time
}
