Meteor.isClient && Template.afObjectField_compact.helpers({
  quickFieldsAtts: function () {
    return _.pick(this, 'name', 'id-prefix');
  }
});

Meteor.isClient && AutoForm.setDefaultTemplateForType('afObjectField', 'compact');