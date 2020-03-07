const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.createActivity = functions.firestore
  .document('events/{eventId}')
  .onCreate(event => {
    let newEvent = event.data();

    console.log('new eventtttttttt', newEvent);

    const activity = {
      type: 'newEvent',
      eventDate: newEvent.date,
      hostedBy: newEvent.hostedBy,
      title: newEvent.title,
      photoURL: newEvent.hostPhotoURL,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      hostUid: newEvent.hostUid,
      eventId: event.id,
    };

    console.log('activityyyyyyyyyy', activity);

    return admin
      .firestore()
      .collection('activity')
      .add(activity)
      .then(docRef => {
        return console.log('Activity created with ID', docRef.id);
      })
      .catch(error => {
        return console.log('Error adding activity', error);
      });
  });
