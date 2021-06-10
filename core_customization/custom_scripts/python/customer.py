import frappe

@frappe.whitelist()
def get_events(customer):
	assigned_event_list = frappe.db.get_all('Event Participants', {'reference_doctype':'Customer', 'reference_docname':customer},['parent'])
	created_event_list = frappe.db.get_all('Event', {'created_by': customer})
	for row in created_event_list:
		row['name'] = """<a href="#Form/Event/{0}">{1}</a>""".format(row['name'], row['name'])
	for row in assigned_event_list:
		row['name'] = """<a href="#Form/Event/{0}">{1}</a>""".format(row['name'], row['name'])
	return [created_event_list, assigned_event_list]