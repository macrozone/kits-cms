
Components.register("component_background_box", {
	title: "Background box",
	template: "component_background_box",
	schema: new SimpleSchema({
		boxPosition: {
			type: String,
			allowedValues: ["left", "right"],
			defaultValue: "left"
		},
		content: orion.attribute('froala', {
			label: 'Box-Inhalt'
		}),
		image: orion.attribute("image", {label: "Bild"})
	})
});