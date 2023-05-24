package models

type WholeQuantity uint64

type CompositeQuantity struct {
	Containers uint
	MajorUnits uint32
	MinorUnits uint32
}

/*
type UnitInfo struct {
	Code string

	MajorLongName  string
	MajorShortName string
	MinorLongName  string
	MinorShortName string

	Divisions       uint16
	NaturalInterval uint16
}

func (u *UnitInfo) IsCountable() bool {
	return u.Divisions == 1
}
*/