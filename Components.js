
Components = {
	register(id, definition) {
		definition.id = id;
		this.definitions[id] = definition;
	},
	getDefinition(id){
		return this.definitions[id];
	},
	definitions: {},
	definitionsOptions({allowedComponents = null}) {
		let definitions = _.keys(this.definitions);
		if(_.isArray(allowedComponents)){
			definitions = _.intersection(definitions, allowedComponents);
		}
		return definitions.map((id) => {return {label: this.definitions[id].title, value: id}});
	},
	schema({label = "Components", allowedComponents = null, optional = true}) {
		return new SimpleSchema({
			components: {
				type: [Object],
				label: label,
				optional: optional
			},
			"components.$.definitionId": {
				type: String,
				autoform: {
					options(){
						return Components.definitionsOptions({allowedComponents});
					}
				}
			},
			"components.$.data": {
				
				type: Components.schemaComponentData(),

			},
		});
	},
	schemaComponentData() {

		let allCompomentsSchema = {};

		for(let id in this.definitions) {
			allCompomentsSchema[id] = {
				type: this.definitions[id].schema,
				optional: true,
				
				autoform: {
					//template:"compact",
					omit: function(fieldName){
						if(fieldName) {
							let [component, ___, ...prefix] = fieldName.split(".").reverse();
							let definitionField = `${prefix.reverse().join(".")}.definitionId`;
							let definition = AutoForm.getFieldValue(definitionField);
							return definition !== component;
						}
					}
				}
			};
		}
		return new SimpleSchema(allCompomentsSchema);
	}

}

if(Meteor.isClient) {
	Template.Components_component.helpers({
		data() {
			return this.data[this.definitionId];
		},
		definition(){
			let definition = Components.getDefinition(this.definitionId);
			return definition;
		}
	});
}
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
Components.register("component3", {
	title: "Component 3",
	template: "component3",
	schema: new SimpleSchema({

		content: orion.attribute('froala', {
			label: 'Inhalt'
		}),
		emails: {
			type: [String]
		}
	})
});

