package domain

import "errors"

var (
	// ErrAccountNotFound is returned when an account is not found.
	ErrAccountNotFound = errors.New("account not found")
	// ErrDuplicatedAPIkey is returned when an API key already exists.
	ErrDuplicatedAPIkey = errors.New("API key already exists")
	// ErrInvoiceNotFound is returned when an invoice is not found.
	ErrInvoiceNotFound = errors.New("invoice not found")
	// ErrUnauthorizedAccess is returned when a user is not authorized to perform an action.
	ErrUnauthorizedAccess = errors.New("unauthorized access")
)
