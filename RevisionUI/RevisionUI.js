
const collections = {}

RevisionUI = {
	add(collection) {
		collections[collection._name] = collection
	}
}
if(Meteor.isClient) {
	Template.RevisionUI.helpers({
		collections() {

			return _.values(collections).filter((collection) => collection.find().count() > 0)
		}
	});

	Template.RevisionUI_oneCollection.helpers({
		docs(collection) {
			return collection.find();
		}
	});
	Template.RevisionUI_oneCollection_oneDoc_oneRevision.helpers({
		isActive(doc, revision) {
			
			return doc.activeRevision === revision.revisionId;
		}
	});
	Template.RevisionUI_oneCollection_oneDoc_oneRevision.events({
		["click .btn-restore"]() {
			Meteor.call("RevisionUI.restore",this.collection._name, this.doc._id, this.revision.revisionId);
		}
	});
}

Meteor.methods({
	["RevisionUI.restore"](collectionName, docId, revisionId) {
		CollectionRevisions.restore(collections[collectionName], docId, revisionId);
		console.log("restore", collectionName, docId, revisionId);
	}
});
