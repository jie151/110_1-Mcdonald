import db from '../component/connect';

export default function CustomizeFromDB(id) {
    return new Promise((resolve, reject) => {
        var list = [];
        var temp = undefined;
        //var firebaseRef = db.collection('CustomizeOption			').doc(id).collection('optionDetail').where("option_id", ">", 0).get()
        var firebaseRef = db.collection('CustomizeOption').doc(id).collection('optionDetail').where("option_id", ">", 0).get()
        firebaseRef.then((dataSnapshot) => {
            dataSnapshot.forEach((doc) => {
                if (doc.exists) {
                    setDocument(doc.data());
                }
                else {
                    console.error("No such document!");
                }
            })

        }).then(() => {

            //console.log(list);
            list ? resolve(list) : reject('No such document!');

        }).catch(error => {
            console.log(error);
        })

        function setDocument(data) {
            temp = data;
            list.push(temp);
        }
    });
}
//	var firebaseRef=db.collection('cguscholar').doc(`${id}`).collection('updata_time').get()