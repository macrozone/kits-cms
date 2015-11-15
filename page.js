
Galleries = new orion.collection('Galleries', {
	singularName: 'Gallerie', 
	pluralName: 'Gallerien',
	title: 'Gallerien',
	tabular: {
		columns: [
		{ data: "title", title: "Beschriftung" },
		]
	}
});

Galleries.attachSchema(new SimpleSchema({
	title: {
		type: String
	},
	images: orion.attribute('images', {
		label: 'Images'
	})
}));


orion.pages.collection.helpers({
	carousel() {
		return Galleries.findOne(this.galleryId);
	}
});



orion.pages.addTemplate({
	layout: 'layout',
	template: 'page',
	name: 'Page',
	description: 'Default page template'
}, {
	content: orion.attribute('froala', {
		optional: true,
		label: 'Inhalt'
	}),
	carouselArea: {
		optional: true,
		type: Components.schema({
			label: "Carousel", 
			optional: true,
			allowedComponents: ["component_background_box"]
		}),
	},
	mainArea: {
		optional: true,
		type: Components.schema({label: "mainArea", optional: true}),
	}
});



if(Meteor.isClient) {
	
	
	Template.page.helpers({
		collection(){
			return orion.pages.collection;
		}
	});

	
	Template.page_carousel.onRendered(function(){
		let slickInit = false;
		this.autorun(()=>{
			let page = orion.pages.collection.findOne(this._id);
			if(page) {
				Meteor.defer(()=>{

					if(slickInit)
						this.$('.slick').slick("unslick");
					this.$('.slick').slick({
						dots: true,
						arrows: true
					});
					slickInit = true;
				});
			}
			
		});

	});



}

if(Meteor.isServer) {

	Meteor.publish("gallery", function(galleryId) {
		return Galleries.find(galleryId);
	});
}

