import { Router } from 'express';
import { createNewInvoice, getAllInvoiceHistory, getAllInvoices, getAllInvoicesForParentId, getInvoiceByID, getStripeIdForParentId, makePayment, stripeWebhook } from '../controllers/billing';

const router = Router();

router.get('/invoices', getAllInvoices)
router.post('invoices', createNewInvoice)
router.get('/invoices/:id', getInvoiceByID)
router.get('/invoices/parent/:id', getAllInvoicesForParentId)
router.get('/invoices/parent/stripe/:id', getStripeIdForParentId)
router.get('/invoices/history', getAllInvoiceHistory)
router.get('/invoices/history/parent/:id', getAllInvoiceHistoryForParentId)
router.post('/payment', makePayment)
router.post('/payment/recurring', makeRecurringPayment)
router.post('/payment/webhook', stripeWebhook)

export default router;