package models

type RetailItem struct {
	BaseModel
	Name  string
	Price uint
}


type ItemCommon struct {
	Name string
}