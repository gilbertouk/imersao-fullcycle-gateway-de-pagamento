package server

import (
	"net/http"

	"github.com/gilbertouk/imersao-fullcycle-gateway-de-pagamento/go-gateway-api/internal/service"
	"github.com/gilbertouk/imersao-fullcycle-gateway-de-pagamento/go-gateway-api/internal/web/handlers"
	"github.com/go-chi/chi/v5"
)

type Server struct {
	router         *chi.Mux
	server         *http.Server
	accountService *service.AccountService
	port           string
}

func NewServer(accountService *service.AccountService, port string) *Server {
	return &Server{
		router:         chi.NewRouter(),
		accountService: accountService,
		port:           port,
	}
}

func (s *Server) ConfigureRoutes() {
	accountHendler := handlers.NewAccountHandler(s.accountService)

	s.router.Post("/accounts", accountHendler.Create)
	s.router.Get("/accounts", accountHendler.Get)
}

func (s *Server) Start() error {
	s.server = &http.Server{
		Addr:    ":" + s.port,
		Handler: s.router,
	}
	return s.server.ListenAndServe()
}
