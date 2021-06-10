import frappe

@frappe.whitelist()
def get_events(customer):
	created_event_list = frappe.db.get_all('Event Participants', {'reference_doctype':'Customer', 'reference_docname':customer},['parent'])
	assigned_event_list = frappe.db.get_all('Event', {'created_by': customer})
	return [created_event_list, assigned_event_list]