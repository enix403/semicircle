package main

import (
	"fmt"
	"semicircle/web/app"
	m "semicircle/web/app/models"
	_ "github.com/davecgh/go-spew/spew"
)


var _ = m.BaseModel{}

func runnableStart() {
	fmt.Println("Runnable")

	db := app.ConnectToDatabase()
	var _ = db

	company := m.Company {
		Name: "Company A",
		User: m.User{
			Name: "User A",
		},
	}
	db.Create(&company)

	// user := &company.User

}



func main() {
	runnableStart()
}