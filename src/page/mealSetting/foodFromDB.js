import db from '../component/connect';

export default function foodFromDB(id) {
    return new Promise((resolve, reject) => {
        var temp = undefined;
        var firebaseRef = db.collection('Food').doc(id).get()
        firebaseRef.then((dataSnapshot) => {

            if (dataSnapshot.exists) {
                setDocument(dataSnapshot.data());
            }
            else {
                console.error("No such document!");
            }
        }).then(() => {
            temp ? resolve(temp) : reject('No such document!');

        }).catch(error => {
            console.log(error);
        })

        function setDocument(data) {
            temp = data;
        }
    });
}
//	var firebaseRef=db.collection('cguscholar').doc(`${id}`).collection('updata_time').get()