package database

import (
	"fmt"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	gormlog "gorm.io/gorm/logger"
)

var DB *gorm.DB

func ConnectDB() {
	var err error
	//* Connection URL to connect to mysql Database
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s", Config("DB_USER_DEV"), Config("DB_PASSWORD_DEV"), Config("DB_HOST"), Config("DB_PORT_DEV"), Config("DB_NAME"))

	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
		Logger: gormlog.Default.LogMode(gormlog.LogLevel(gormlog.Info)),
	})
	if err != nil {
		fmt.Println("error: ", err)
		panic("failed to connect database")
	}
}
