package controllers

import (
	// c "semicircle/web/app/common"
	"encoding/json"
	"fmt"
	_ "fmt"
	protos_sm "semicircle/web/protos.sm"

	// m "semicircle/web/app/models"
	"github.com/gofiber/fiber/v2"

	"google.golang.org/protobuf/encoding/protojson"
)

func (ctrl ControllerSet) HandleQueryItems(c *fiber.Ctx) error {
	list := protos_sm.ItemList{}

	list.Items = []*protos_sm.Item {
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

func (ctrl ControllerSet) HandleCmdCreateItem(c *fiber.Ctx) error {
	cmd := protos_sm.CmdCreateItem{}

    if err := c.BodyParser(&cmd); err != nil {
        fmt.Println("error = ",err)
        return c.SendStatus(401)
    }

    fmt.Printf("%#+v\n", cmd)
    return c.JSON("Hello");
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