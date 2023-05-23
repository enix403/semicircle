package models

import (
	c "semicircle/web/app/common"
	"time"
)

type MonetaryAmount float64
type WholeQuantity uint64

type CompositeQuantity struct {
	Containers uint
	MajorUnits uint32
	MinorUnits uint32
}

type StoreMeta struct {
	BaseModel
	OpeningBalance MonetaryAmount
	OpenedAt       time.Time
	CurrentBalance MonetaryAmount
}

type AccountingEvent struct {
	BaseModel
	PastBalance MonetaryAmount
	Amount      MonetaryAmount
	Kind        c.AccountingEventKind
	Timestamp   time.Time
}

// --------------------------------

type Customer struct {
	BaseModel
	Name       string
	Credit     MonetaryAmount
	Clearances []CreditClearance
}

type CreditClearance struct {
	BaseModel
	CustomerID uint
	Customer   Customer `gorm:"foreignKey:CustomerID"`
	Amount     MonetaryAmount
	Timestamp  time.Time
}

// --------------------------------

type Item struct {
	BaseModel
	Name       string
	AppCode    string
	BarCode    string
	BarCodeStd string

	Kind     c.ItemKind
	UnitCode string
	Price    MonetaryAmount

	OpenForSale bool
	Active      bool
}

type Service struct {
	BaseModel
	Name     string
	Code     string
	AbsPrice string
	Active   bool
}

// ------------------------------------

type ItemConversion struct {
	BaseModel
	SourceItemID uint
	SourceItem   Item `gorm:"foreignKey:SourceItemID"`
	TargetItemID uint
	TargetItem   Item `gorm:"foreignKey:TargetItemID"`
}

// ------------------------------------

type Stock struct {
	BaseModel

	ItemID uint
	Item   Item `gorm:"foreignKey:ItemID"`

	Quantity  WholeQuantity
	UpdatedAt time.Time
}

type StockUpdateEvent struct {
	BaseModel
	ItemID uint
	Item   Item `gorm:"foreignKey:ItemID"`

	DeltaQty  WholeQuantity
	Kind      c.StockUpdateEventKind
	Timestamp time.Time

	// BuyOrder
	// Sale
	// Adjustment
	ConversionID uint
	Conversion   ItemConversion `gorm:"foreignKey:ConversionID"`
}

// ------------------------------------

// Used as an embedded struct
type BORate struct {
	RateValue MonetaryAmount
	RateUnit  CompositeQuantity `gorm:"embedded;embeddedPrefix:rate_unit_"`
}

type Supplier struct {
	BaseModel
	Name string
	// TODO: IDs like NTN etc
}

type SupplierAssignment struct {
	BaseModel
	SupplierID uint
	Supplier   Supplier `gorm:"foreignKey:SupplierID"`

	ItemID uint
	Item   Item `gorm:"foreignKey:ItemID"`

	BORate
}

type BuyOrder struct {
	BaseModel
	SupplierID uint
	Supplier   Supplier `gorm:"foreignKey:SupplierID"`

	IssuedAt    time.Time
	DeliveredAt time.Time
	Status      c.BuyOrderStatus
}

type BuyOrderItem struct {
	BaseModel

	BuyOrderID uint
	BuyOrder   BuyOrder `gorm:"foreignKey:BuyOrderID"`

	ItemID uint
	Item   Item `gorm:"foreignKey:ItemID"`

	BORate
	SupplQty WholeQuantity
}

// ------------------------------------

type Sale struct {
	BaseModel

	GrandTotal MonetaryAmount
	Discount   MonetaryAmount

	PaymentMode c.PaymentMode

	CustomerID uint
	Customer   *Customer `gorm:"foreignKey:CustomerID"`
	Timestamp  time.Time
}

type SaleItem struct {
	BaseModel

	SaleID uint
	Sale   Sale `gorm:"foreignKey:SaleID"`

	ItemID uint
	Item   Item `gorm:"foreignKey:ItemID"`

	Price    MonetaryAmount
	Quantity WholeQuantity
}

type SaleServiceOrder struct {
	BaseModel

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
