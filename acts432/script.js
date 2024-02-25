// Function to load deeds from localStorage
function loadDeeds() {
    var deeds = JSON.parse(localStorage.getItem("goodDeeds")) || [];
    deeds.forEach(function(deed) {
        createStickyNote(deed.date, deed.text);
    });
}

function postDeed() {
  var input = document.getElementById("goodDeedInput");
  if (input.value.trim() === "") {
    alert("Please enter a good deed.");
    return;
  }

  // Add a new document with a generated ID
  db.collection("deeds").add({
    date: firebase.firestore.Timestamp.fromDate(new Date()),
    text: input.value
  })
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    input.value = ""; // Clear input after saving
    loadDeeds(); // Reload the deeds to include the new one
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });
}

// Function to create a sticky note element
function createStickyNote(date, text) {
    var wall = document.getElementById("wall");
    var stickyNote = document.createElement("div");
    stickyNote.className = "sticky-note";
    stickyNote.innerText = `${date}: ${text}`;
    wall.appendChild(stickyNote);
}

// Call loadDeeds when the page loads to display saved deeds
window.onload = function() {
    loadDeeds();
};
