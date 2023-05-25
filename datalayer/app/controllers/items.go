package controllers

/*
import (
	c "semicircle/web/app/common"
	m "semicircle/web/app/models"
)

type GetItemsQuery struct {
	IncludeInactive       bool
	Kind                  c.ItemKind
	IncludeNotOpenForSale bool
}

func (q *GetItemsQuery) Execute(app *c.Application) []m.Item {
	conds := make(map[string]interface{}, 3)

	if !q.IncludeInactive {
		conds["Active"] = true
	}

	if q.Kind != "" {
		conds["Kind"] = q.Kind
	}

	if !q.IncludeNotOpenForSale {
		conds["OpenForSale"] = true
	}

	var items []m.Item
	app.Db.Model(&m.Item{}).Where(conds).Find(&items)

	return items
}
*/