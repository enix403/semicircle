package models

import (
	c "semicircle/web/app/common"
	"time"
)

type StoreMeta struct {
	BaseDbModel

	/* One-time Initialization */
	OpeningBalance MonetaryAmount
	OpenedAt       time.Time

	/* Gets updated after every AccountingEvent */
	CurrentBalance MonetaryAmount
}

type AccountingEvent struct {
	BaseDbModel
	// Store balance prior to this event. Basically the value of StoreMeta::CurrentBalance before this
	// event took place is copied here
	PastBalance MonetaryAmount
	// Amount to add (+) or subtract (-) from store balance
	Amount      MonetaryAmount
	// One of:
	//		Clearance of items payment at the time of sale
	// 		Clearance of services payment
	// 		Clearance of customer credit
	//		Payment for a buy order
	Kind        c.AccountingEventKind
	// ID of whatever holds more information about the transaction
	RefID       uint
	Timestamp   time.Time
}
