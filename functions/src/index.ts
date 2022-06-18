import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

export const addCreatedDate = functions.firestore
    .document("/farms/{wildcard}")
    .onCreate(async (snap, context) => {
      console.log(snap);
      console.log(context);
      await admin.firestore().collection("farms").doc(snap.id)
          .update({createdDate: admin.firestore.FieldValue.serverTimestamp()})
          .then((value)=>{
            console.log(value);
          }).catch((error) => {
            console.log(error);
          });
    });

