# React Firestore Workshop
In this workshop, we are going to practice using Firestore.

1. Clone the repo, install the dependencies and run the app.
```
git clone https://github.com/madeleinedarbyshire/ReactFirestoreWorkshop.git
cd firestore-app
npm install
npm install @expo/ngrok@^4.1.0
npx expo start --tunnel
```

2. Set up a firestore database following [this guide](https://madeleinedarbyshire.github.io/CMP3035/guides/firebase)

3. Select start collection and create a collection called Observations.
    ![Start Collection](https://madeleinedarbyshire.github.io/CMP3035/assets/workshop5/start-collection.png)

    ![Create Collection](https://madeleinedarbyshire.github.io/CMP3035/assets/workshop5/create-collection.png)

4. You will need to add at least one document to the collection to complete the setup of the collection so I suggest you use my template observation with the following fields:
    - title: Pink Sky
    - description: A pink sky over Brayford Campus
    - date: [choose any date]
    - image: [I have provided a base64 text encoded image you can use to populate this field at ReactFirestoreWorkshop/pink_sky.txt. Open this file, select all contents (using CTRL-A) and copy and paste it into the image field]

    ![First Document](https://madeleinedarbyshire.github.io/CMP3035/assets/firestore/first_document.png)

4. Create and retrieve your credentials from the Firebase dashboard as described [here](https://madeleinedarbyshire.github.io/CMP3035/guides/firebase#create-credentials) and paste these into components/Firebase.js.

5. Initialise the Firebase db in components/Firebase.js

    ```javascript
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    ```

5. The homepage of the app is the feed - but it's currently empty! To populate it with the content of your Observations collection, implement `subscribeToPosts` in components/Firebase.js. When this is called, use [onSnapshot](https://firebase.google.com/docs/firestore/query-data/listen) to subscribe to changes to a [query on the Observations collection](https://firebase.google.com/docs/firestore/query-data/get-data#get_multiple_documents_from_a_collection). The `subscribeToPosts` should return an unsubscribe function.

    ```javascript
    export const subscribeToPosts = (callback, sortField, SortDirection) => {
        const q = query(collection(db, COLLECTION));
        return onSnapshot(q, callback);
    }
    ```

6. Implement `addPost` in components/Firebase.js so that you can save content you add to the feed. Use the [addDoc](https://firebase.google.com/docs/firestore/manage-data/add-data) function to add a new document with a title, description, image and date to the Observations collection. Use the `fromDate` function from the [Timestamp class](https://firebase.google.com/docs/reference/js/firestore_.timestamp.md#timestamp_class) to convert a [JavaScript Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/Date) object into the right format for Firestore.

    ```javascript
    export const addPost = async (title, description, image) => {
        const timestamp = Timestamp.fromDate(new Date());
        const value = {title: title, description: description, image: image, date: timestamp}
        await addDoc(collection(db, COLLECTION), value);
    }
    ```

7. Test the implementation by adding a post to the feed.

8.  In `subscribeToPosts` use the [orderBy](https://firebase.google.com/docs/firestore/query-data/order-limit-data#order_and_limit_data) function in the query to sort the data by the specified field and in the specified sort direction.

9. Implement `updatePost` so that the user can edit the title, description or image in a post. The date should remain unchanged. This can be implemented with either [setDoc](https://firebase.google.com/docs/firestore/manage-data/add-data#set_a_document) (be careful not to overwrite everything with this one!) or [updateDoc](https://firebase.google.com/docs/firestore/manage-data/add-data#update-data).

10. Implement `deletePost` so that the user can delete their posts. Use the [deleteDoc](https://firebase.google.com/docs/firestore/manage-data/delete-data#delete_documents) to delete a document.

11. Implement `likePost` so that the `likes` field on the post increment using the [updateDoc and increment](https://firebase.google.com/docs/firestore/manage-data/add-data#increment_a_numeric_value) function. The likes field does not need to exist beforehand for this to work.

12. Implement `dislikePost` so that the `dislikes` field on the post increment.

13. Add the option in screens/Feed.js to sort the posts by Most Popular (the posts with the highest number of likes to lowest number of likes) by adding to sortOptions array in screens/Feed.js. Note: posts that have 0 likes will not appear since the field hasn't been added because [orderBy filters out items where the field doesn't exist](https://firebase.google.com/docs/firestore/query-data/order-limit-data#orderby_and_existence). You will need to add the `likes` field when posts are created as well as to existing posts (via the Firebase console) to ensure all existing and future posts are returned.
