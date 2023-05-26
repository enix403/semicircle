package controllers

import (
	// c "semicircle/web/app/common"
	"encoding/json"
	_ "fmt"
	protos_go "semicircle/web/twirp.sm"

	// m "semicircle/web/app/models"
	"github.com/gofiber/fiber/v2"

	"google.golang.org/protobuf/encoding/protojson"
)



func (ctrl ControllerSet) HandleItemsQuery(c *fiber.Ctx) error {
	list := protos_go.ItemList{}

	list.Items = []*protos_go.Item {
		{
			Name: "Item A",
		},
		{
			Name: "Item B",
		},
	}

	m := protojson.MarshalOptions{
		EmitUnpopulated: true,
		UseProtoNames: true,
		// Multiline: true,
		// Indent: "  ",
	}
	resp, _ := m.Marshal(&list)

	return c.JSON(json.RawMessage(resp[:]))
}


/*
import (
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