
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
		label: 'Inhalt'
	}),
	mainArea: {
		type: Components.schema(),
	},
	galleryId: orion.attribute('hasOne', {
		label: 'Gallery'
	}, {
		collection: Galleries,
		titleField: 'title',
		publicationName: 'pageGalleries',
		create: function(){
			return true;
		}
	})
});



if(Meteor.isClient) {
	
	
	Template.page.helpers({
		collection(){
			return orion.pages.collection;
		}
	});

	Template.page_carousel.onCreated(function(){
		this.subscribe("gallery", this.data.galleryId);
	});
	Template.page_carousel.onRendered(function(){
		let slickInit = false;
		this.autorun(()=>{
			let gallery = Galleries.findOne(this.data.galleryId);
			if(gallery) {
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

