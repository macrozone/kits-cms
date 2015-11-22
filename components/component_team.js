orion.components.registerComponent("component_team", {
	title: "Team",
	templateFrontend: "component_team",
	schema: new SimpleSchema({
		title: {
			type: String
		}

	})
});

if(Meteor.isClient) {
	Template.component_team.onCreated(function(){
		this.subscribe("team");
	});
	Template.component_team.helpers({
		persons() {
			return People.find();
		}
	});
}

if(Meteor.isServer) {
	Meteor.publish("team", function(){
		return People.find();
	});
}