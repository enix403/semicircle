package controllers

import (
	// c "semicircle/web/app/common"
	"encoding/json"
	"fmt"
	pm "semicircle/web/protos.sm"

	"github.com/gofiber/fiber/v2"
	m "semicircle/web/app/models"

	"google.golang.org/protobuf/encoding/protojson"
)

var marshaller = protojson.MarshalOptions{
	EmitUnpopulated: true,
}

var unmarshaller = protojson.UnmarshalOptions{
	DiscardUnknown: true,
}


func (ctrl ControllerSet) HandleQueryItems(c *fiber.Ctx) error {
	list := pm.ItemList{}

	var items []m.Item

	ctrl.App.Db.Find(&items)
	ret := make([]*pm.Item, len(items))
	for i := range ret {
		a := &pm.Item{}
		items[i].HydrateProto(a)
		ret[i] = a
	}

	list.Items = ret

	resp, _ := marshaller.Marshal(&list)
	return c.JSON(json.RawMessage(resp[:]))
}

func (ctrl ControllerSet) HandleCmdCreateItem(c *fiber.Ctx) error {
	cmd := pm.CmdCreateItem{}

	if err := unmarshaller.Unmarshal(c.Body(), &cmd); err != nil {
		fmt.Println("Unmarshal Error = ", err)
		return c.SendStatus(401)
	}

	return c.JSON("Hello")
}

/*
import (
)

type GetQueryItems struct {
	IncludeInactive       bool
	Kind                  c.ItemKind
	IncludeNotOpenForSale bool
}

func (q *GetQueryItems) Execute(app *c.Application) []m.Item {
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
