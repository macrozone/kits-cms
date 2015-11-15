Router.route("/", {
	subscriptions() {
		return Meteor.subscribe('pages');
	},
	name: "home",
	layoutTemplate: "layout"
})