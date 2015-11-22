
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




