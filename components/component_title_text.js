orion.components.registerComponent("component_title_text", {
	title: "Titel und Text",
	templateFrontend: "component_title_text",
	schema: new SimpleSchema({
		title: {
			type: String
		},
		content: orion.attribute('froala', {
			label: 'Inhalt'
		}),

	})
});