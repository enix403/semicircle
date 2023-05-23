package commands

import (
	"fmt"
	"os"

	"github.com/spf13/cobra"

	"semicircle/web/app"
)

var RootCmd = cobra.Command{
	Use:   "semicircle",
	Short: "Short",
	Long:  "Long",
}

var serveCmd = cobra.Command{
	Use:   "serve",
	Short: "start http server with configured api",
	Long:  `Starts a http server and serves the configured api`,
	Run: func(cmd *cobra.Command, args []string) {
		app.BootServerApp()
	},
}

var migrateCmd = cobra.Command{
	Use:   "migrate",
	Short: "migrate",
	Long:  `migrate`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Auto Migrating")
		db := app.ConnectToDatabase()
		app.MigrateDB(db)
		fmt.Println("Done")
	},
}

var seedCmd = cobra.Command{
	Use:   "seed",
	Short: "seed",
	Long:  `seed`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("Auto Migrating")
		db := app.ConnectToDatabase()
		app.MigrateDB(db)
		fmt.Println("Seeding")
		SeedDatabase(db)
		fmt.Println("Done")
	},
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	if err := RootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func init() {
	RootCmd.AddCommand(&serveCmd)
	RootCmd.AddCommand(&migrateCmd)
	RootCmd.AddCommand(&seedCmd)
}
