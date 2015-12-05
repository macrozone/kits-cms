


orion.pages.addTemplate({
	layout: 'layout',
	template: 'page',
	name: 'Page',
	description: 'Simple page template'
}, {
	
	carouselArea: {
		optional: true,
		type: orion.components.components({
			label: "Carousel", 
			optional: true,
			allowedComponents: ["component_background_box"]
		}),
	},
	content: orion.attribute('froala', {
		optional: true,
		label: 'Inhalt'
	}),
	
});

orion.pages.addTemplate({
	layout: 'layout',
	template: 'page_advanced',
	name: 'Page Advanced',
	description: 'Advanced page template'
}, {
	
	carouselArea: {
		optional: true,
		type: orion.components.components({
			label: "Carousel", 
			optional: true,
			allowedComponents: ["component_background_box"]
		}),
	},
	mainArea: {
		optional: true,
		type: orion.components.components({label: "mainArea", optional: true}),
	}
	
});




if(Meteor.isClient) {
	
	
	Template.page.helpers({
		collection(){
			return orion.pages.collection;
		}
	});

	
}

