package common

type AccountingEventKind string

const (
	ACK_CLEAR_SALE_ITEM       AccountingEventKind = "clr_items"
	ACK_CLEAR_SALE_SERVICE    AccountingEventKind = "clr_service"
	ACK_CLEAR_CUSTOMER_CREDIT AccountingEventKind = "clr_credit"
	ACK_PAY_BUY_ORDER         AccountingEventKind = "pay_bo"
)

type ItemKind string

const (
	ITEM_KIND_RETAIL       ItemKind = "retail"
	ITEM_KIND_RAW          ItemKind = "raw"
	ITEM_KIND_SELF_PACKAGE ItemKind = "self_package"
)

type StockUpdateEventKind string

const (
	SUE_SALE              StockUpdateEventKind = "sale"
	SUE_BUYORDER_DELIVERY StockUpdateEventKind = "bo_delivery"
	SUE_ITEM_CONVERSION   StockUpdateEventKind = "item_cnvrt"
	// SUE_MANUAL_ADJUSMENT = "man_adj"
)

type BuyOrderStatus string

const (
	BO_STATUS_PENDING   BuyOrderStatus = "pending"
	BO_STATUS_DELIVERED BuyOrderStatus = "delivered"
)

type PaymentMode string

const (
	SALE_PAYMENT_CASH   PaymentMode = "cash"
	SALE_PAYMENT_CREDIT PaymentMode = "credit"
)

type ServiceOrderStatus string

const (
	SO_STATUS_PENDING     ServiceOrderStatus = "pending"
	SO_STATUS_AWAITING    ServiceOrderStatus = "awaiting"
	SO_STATUS_HANDED_OVER ServiceOrderStatus = "handed"
)
