import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Dashboards = new Mongo.Collection('dashboards')

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('dashboards', function dashboardsPublication() {
    return Dashboards.find({ owner: this.userId })
  })
}

Meteor.methods({
  'dashboards.insert'(conf) {
    check(conf, Object)

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Dashboards.insert({
      conf:conf,
      createdAt: new Date(),
      owner: Meteor.userId()
    });
  },
  'dashboards.remove'(id) {
    check(id, String);

    const dashboard = Dashboards.findOne(id)
    if (dashboard.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Dashboards.remove(id)
  }
})
