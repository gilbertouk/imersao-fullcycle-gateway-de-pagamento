package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"github.com/gilbertouk/imersao-fullcycle-gateway-de-pagamento/go-gateway-api/internal/repository"
	"github.com/gilbertouk/imersao-fullcycle-gateway-de-pagamento/go-gateway-api/internal/service"
	"github.com/gilbertouk/imersao-fullcycle-gateway-de-pagamento/go-gateway-api/internal/web/server"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq" // Importa o driver do PostgreSQL
)

func getEnv(key, defaultValue string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}
	// Se a variável de ambiente não estiver definida, retorna o valor padrão
	return defaultValue
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	// String de conexao com o banco de dados
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=%s",
		getEnv("DB_HOST", "db"),
		getEnv("DB_PORT", "5432"),
		getEnv("DB_USER", "postgres"),
		getEnv("DB_PASSWORD", "postgres"),
		getEnv("DB_NAME", "gateway"),
		getEnv("DB_SSLMODE", "disable"),
	)

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal("Error connecting to database: ", err)
	}
	defer db.Close()

	accountRepository := repository.NewAccountRepository(db)
	accountService := service.NewAccountService(accountRepository)

	port := getEnv("HTTP_PORT", "8080")
	srv := server.NewServer(accountService, port)
	srv.ConfigureRoutes()

	if err := srv.Start(); err != nil {
		log.Fatal("Error starting server: ", err)
	}
}
