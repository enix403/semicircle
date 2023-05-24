package controllers

import (
	c "semicircle/web/app/common"
	m "semicircle/web/app/models"
)

func GetStoreMeta(app *c.Application) (m.StoreMeta, error) {
	db := app.Db

	var meta m.StoreMeta
	result := db.First(&meta)

	if result.Error != nil || result.RowsAffected < 1 {
		return meta, result.Error
	} else {
		return meta, nil
	}
}
