package models

type UnitInfo struct {
	Slug string

	PrincipleLong  string
	PrincipleShort string

	SubLong  string
	SubShort string

	Divisions        uint
	AllowedIntervals uint
}

type ComposityQuantity struct {
	Containers     uint
	PrincipleUnits uint
	SubUnits       uint

	Unit *UnitInfo
}
