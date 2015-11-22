Components.register("component_title_text", {
	title: "Titel und Text",
	template: "component_title_text",
	schema: new SimpleSchema({
		title: {
			type: String
		},
		content: orion.attribute('froala', {
			label: 'Inhalt'
		}),

	})
});