frappe.ui.form.on('Customer', {
	refresh: function(frm){
		frm.trigger("show_summary");
	},
	show_summary: function(frm) {
        frappe.call({
            method:
            "core_customization.custom_scripts.python.customer.get_events",
            args: {
                'customer': frm.doc.name
            },
            callback: function(data){
                if (data.message) {
                    if(!$.isEmptyObject(data.message[0])){
                        let section = frm.dashboard.add_section(
                        frappe.render_template('events-created', {
                            created_events: data.message[0]
                        })
                        );
                    }
                    if(!$.isEmptyObject(data.message[1])){
                        let section = frm.dashboard.add_section(
                        frappe.render_template('events-as-partcipant', {
                            assigned_events: data.message[1]
                        }) );
                    }
                    frm.dashboard.show();
                }
            }
        });
	}
});

frappe.templates["events-created"] = ' \
<h5 style="margin-top: 0px;">{{ __("Created Events Summary") }}</h5>\
<table class="table table-bordered small">\
	<thead>\
		<tr>\
			<td style="width: 50%">{{ __("Event") }}</td>\
		</tr>\
	</thead>\
	<tbody>\
        {% for row in created_events %}\
		<tr>\
			<td>\
				{{ row["name"] }}\
			</td>\
		</tr>\
        {% endfor %}\
	</tbody>\
</table>\
';

frappe.templates["events-as-partcipant"] = ' \
<h5 style="margin-top: 0px;">{{ __("Events as Participant") }}</h5>\
<table class="table table-bordered small">\
	<thead>\
		<tr>\
			<td style="width: 50%">{{ __("Event") }}</td>\
		</tr>\
	</thead>\
	<tbody>\
        {% for row in assigned_events %}\
		<tr>\
			<td>\
				{{ row["name"] }}\
			</td>\
		</tr>\
        {% endfor %}\
	</tbody>\
</table>\
';