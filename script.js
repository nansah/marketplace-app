import { db, storage, collection, addDoc, onSnapshot, ref, uploadBytes, getDownloadURL } from './firebase.js';

const messagesRef = collection(db, "messages");

// Listen for messages and update UI
onSnapshot(messagesRef, (snapshot) => {
    const chatBox = document.getElementById("chat-box");
    chatBox.innerHTML = ""; 

    snapshot.forEach((doc) => {
        const msg = doc.data();
        const messageElement = document.createElement("div");

        messageElement.innerHTML = `<p><strong>${msg.sender}:</strong> ${msg.text} 
            ${msg.image ? `<br><img src="${msg.image}" width="100">` : ""}
            ${msg.measurement ? `<br><a href="${msg.measurement}" target="_blank">View Measurements</a>` : ""}
        </p>`;
        
        chatBox.appendChild(messageElement);
    });
});

// Handle chat message submission
document.getElementById("chat-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const messageInput = document.getElementById("message");
    const imageInput = document.getElementById("image-upload");
    const measurementInput = document.getElementById("measurements-upload");
    let imageUrl = "";
    let measurementUrl = "";

    // Upload image if available
    if (imageInput.files.length > 0) {
        const file = imageInput.files[0];
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        imageUrl = await getDownloadURL(storageRef);
    }

    // Upload measurements if available
    if (measurementInput.files.length > 0) {
        const file = measurementInput.files[0];
        const storageRef = ref(storage, `measurements/${file.name}`);
        await uploadBytes(storageRef, file);
        measurementUrl = await getDownloadURL(storageRef);
    }

    // Save message to Firestore
    await addDoc(messagesRef, {
        sender: "Customer",
        text: messageInput.value,
        image: imageUrl,
        measurement: measurementUrl,
        timestamp: new Date()
    });

    messageInput.value = "";
    imageInput.value = "";
    measurementInput.value = "";
});
// Measurement Popover Handling
document.getElementById("open-measurements").addEventListener("click", function() {
    document.getElementById("measurement-form").classList.remove("hidden");
});

document.getElementById("close-measurements").addEventListener("click", function() {
    document.getElementById("measurement-form").classList.add("hidden");
});

document.getElementById("save-measurements").addEventListener("click", async function() {
    const bust = document.getElementById("bust").value;
    const waist = document.getElementById("waist").value;
    const hips = document.getElementById("hips").value;
    const shoulderWaist = document.getElementById("shoulder-waist").value;
    const waistKnee = document.getElementById("waist-knee").value;

    if (!bust || !waist || !hips || !shoulderWaist || !waistKnee) {
        alert("Please fill out all measurements.");
        return;
    }

    // Save measurement data in Firestore
    await addDoc(messagesRef, {
        sender: "Customer",
        text: "Measurement details submitted",
        measurements: { bust, waist, hips, shoulderWaist, waistKnee },
        timestamp: new Date()
    });

    document.getElementById("measurement-form").classList.add("hidden");
    alert("Measurements saved!");
});
