package handlers

import (
	"encoding/json"
	"net/http"

	"github.com/gilbertouk/imersao-fullcycle-gateway-de-pagamento/go-gateway-api/internal/domain"
	"github.com/gilbertouk/imersao-fullcycle-gateway-de-pagamento/go-gateway-api/internal/dto"
	"github.com/gilbertouk/imersao-fullcycle-gateway-de-pagamento/go-gateway-api/internal/service"
	"github.com/go-chi/chi/v5"
)

type InvoiceHandler struct {
	service *service.InvoiceService
}

func NewInvoiceHandler(service *service.InvoiceService) *InvoiceHandler {
	return &InvoiceHandler{
		service: service,
	}
}

// Request authentication from X-API-Key header
// Endpoint: /invoices
// Method: POST
// Description: Create a new invoice
func (h *InvoiceHandler) Create(w http.ResponseWriter, r *http.Request) {
	var input dto.CreateInvoiceInput
	err := json.NewDecoder(r.Body).Decode(&input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	input.APIKey = r.Header.Get("X-API-Key")

	output, err := h.service.Create(input)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(output)
}

// Request authentication from X-API-Key header
// Endpoint: /invoices/{id}
// Method: GET
// Description: Get an invoice by ID
func (h *InvoiceHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := chi.URLParam(r, "id")
	if id == "" {
		http.Error(w, "ID is required", http.StatusBadRequest)
		return
	}

	apiKey := r.Header.Get("X-API-Key")
	if apiKey == "" {
		http.Error(w, "X-API-Key is required", http.StatusUnauthorized)
		return
	}

	output, err := h.service.GetByID(id, apiKey)
	if err != nil {
		switch err {
		case domain.ErrInvoiceNotFound:
			http.Error(w, err.Error(), http.StatusNotFound)
			return
		case domain.ErrAccountNotFound:
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		case domain.ErrUnauthorizedAccess:
			http.Error(w, err.Error(), http.StatusForbidden)
			return
		default:
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(output)
}

// Request authentication from X-API-Key header
// Endpoint: /invoices
// Method: GET
// Description: List all invoices for the authenticated account
func (h *InvoiceHandler) ListByAccount(w http.ResponseWriter, r *http.Request) {
	apiKey := r.Header.Get("X-API-Key")
	if apiKey == "" {
		http.Error(w, "X-API-Key is required", http.StatusUnauthorized)
		return
	}

	output, err := h.service.ListByAccountAPIKey(apiKey)
	if err != nil {
		switch err {
		case domain.ErrAccountNotFound:
			http.Error(w, err.Error(), http.StatusUnauthorized)
			return
		default:
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(output)
}
