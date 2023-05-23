package main

import (
	"fmt"
	"semicircle/web/app/commands"
)

func main() {
	fmt.Println("[Semicircle Boot]")
	commands.Execute()
}
