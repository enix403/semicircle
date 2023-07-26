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


func (ctrl ControllerSet) QueryItems(c *fiber.Ctx) error {
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

func (ctrl ControllerSet) CmdCreateItem(c *fiber.Ctx) error {
	cmd := pm.CmdCreateItem{}

	if err := unmarshaller.Unmarshal(c.Body(), &cmd); err != nil {
		fmt.Println("Unmarshal Error = ", err)
		return c.SendStatus(401)
	}

	return c.JSON("Hello")
}