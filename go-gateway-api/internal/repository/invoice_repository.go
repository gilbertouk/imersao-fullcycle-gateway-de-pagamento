package repository

import (
	"database/sql"

	"github.com/gilbertouk/imersao-fullcycle-gateway-de-pagamento/go-gateway-api/internal/domain"
)

type InvoiceRepository struct {
	db *sql.DB
}

func NewInvoiceRepository(db *sql.DB) *InvoiceRepository {
	return &InvoiceRepository{db: db}
}

func (r *InvoiceRepository) Save(invoice *domain.Invoice) error {
	query := `INSERT INTO invoices (id, account_id, amount, status, description, payment_type, card_last_digits, created_at, updated_at) 
	VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
	_, err := r.db.Exec(query, invoice.ID, invoice.AccountID, invoice.Amount, invoice.Status, invoice.Description,
		invoice.PaymentType, invoice.CardLastDigits, invoice.CreatedAt, invoice.UpdatedAt)

	if err != nil {
		return err
	}

	return nil
}

func (r *InvoiceRepository) FindByID(id string) (*domain.Invoice, error) {
	var invoice domain.Invoice

	query := `SELECT id, account_id, amount, status, description, payment_type, card_last_digits, created_at, updated_at 
	FROM invoices WHERE id = $1`
	row := r.db.QueryRow(query, id)

	err := row.Scan(&invoice.ID, &invoice.AccountID, &invoice.Amount, &invoice.Status,
		&invoice.Description, &invoice.PaymentType, &invoice.CardLastDigits,
		&invoice.CreatedAt, &invoice.UpdatedAt)

	if err == sql.ErrNoRows {
		return nil, domain.ErrInvoiceNotFound
	}

	if err != nil {
		return nil, err
	}

	return &invoice, nil
}

func (r *InvoiceRepository) FindByAccountID(accountID string) ([]*domain.Invoice, error) {
	var invoices []*domain.Invoice

	query := `SELECT id, account_id, amount, status, description, payment_type, card_last_digits, created_at, updated_at 
	FROM invoices WHERE account_id = $1`
	rows, err := r.db.Query(query, accountID)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	for rows.Next() {
		var invoice domain.Invoice
		err := rows.Scan(&invoice.ID, &invoice.AccountID, &invoice.Amount,
			&invoice.Status, &invoice.Description,
			&invoice.PaymentType, &invoice.CardLastDigits,
			&invoice.CreatedAt, &invoice.UpdatedAt)

		if err != nil {
			return nil, err
		}

		invoices = append(invoices, &invoice)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return invoices, nil
}

func (r *InvoiceRepository) UpdateStatus(invoice *domain.Invoice) error {
	query := `UPDATE invoices SET status = $1, updated_at = $2 WHERE id = $3`
	rows, err := r.db.Exec(query, invoice.Status, invoice.UpdatedAt, invoice.ID)

	if err != nil {
		return err
	}

	affectedRows, err := rows.RowsAffected()
	if err != nil {
		return err
	}

	if affectedRows == 0 {
		return domain.ErrInvoiceNotFound
	}

	return nil
}
